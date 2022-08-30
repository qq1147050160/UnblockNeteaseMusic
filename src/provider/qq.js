const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const request = require('../request')

const headers = {
	'origin': 'http://y.qq.com/',
	'referer': 'http://y.qq.com/',
	'cookie': process.env.QQ_COOKIE || null // 'uin=; qm_keyst=',
}

const format = song => ({
	id: { song: song.id, file: song.file.media_mid },
  name: song.title,
  duration: song.interval * 1000,
  album: { id: song.album.mid, name: song.album.name },
  artists: song.singer.map(({ mid, name }) => ({ id: mid, name })),
})

const search = info => {
	return request(
    "POST",
    "https://u.y.qq.com/cgi-bin/musicu.fcg",
    headers,
    JSON.stringify({
      "music.search.SearchCgiService": {
        method: "DoSearchForQQMusicDesktop",
        module: "music.search.SearchCgiService",
        param: {
          num_per_page: 1, // 每页条数
          page_num: 1, // 第几页
          query: info.keyword,
          search_type: 0, // 0单曲 1歌手 2专辑 3歌单 4mv 7歌词 8用户
        },
      },
    })
  )
	.then(response => response.jsonp())
	.then(jsonBody => {
		const result = jsonBody["music.search.SearchCgiService"].data;
    const list = result.body.song.list.map(format);
		const matched = select(list, info)
		return matched ? matched.id : Promise.reject()
	})
}

const single = (id, format) => {
	const uin = ((headers.cookie || '').match(/uin=(\d+)/) || [])[1] || '0'

	const url =
		'https://u.y.qq.com/cgi-bin/musicu.fcg?data=' +
		encodeURIComponent(JSON.stringify({
			req_0: {
				module: 'vkey.GetVkeyServer',
				method: 'CgiGetVkey',
				param: {
					guid: (Math.random() * 10000000).toFixed(0),
					loginflag: 1,
					filename: [format.join(id.file)],
					songmid: [id.song],
					songtype: [0],
					uin,
					platform: '20'
				}
			}
		}))

	return request('GET', url, headers)
	.then(response => response.json())
	.then(jsonBody => {
		const { sip, midurlinfo } = jsonBody.req_0.data
		return midurlinfo[0].purl ? sip[0] + midurlinfo[0].purl : Promise.reject()
	})
}

const track = id => {
	id.key = id.file
	return Promise.all(
		[['F000', '.flac'], ['M800', '.mp3'], ['M500', '.mp3']].slice((headers.cookie || typeof(window) !== 'undefined') ? 1 : 2)
		.map(format => single(id, format).catch(() => null))
	)
	.then(result => result.find(url => url) || Promise.reject())
	.catch(() => insure().qq.track(id))
}

const check = info => cache(search, info).then(track)

module.exports = {check, track}