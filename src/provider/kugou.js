const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const request = require('../request')

const cookieConfig = request.getCookies(process.env.KUGOU_COOKIE)

const headers = {
  cookie: process.env.KUGOU_COOKIE || null
}

const format = (song) => {
	return {
		id: song['hash'],
		id_hq: song['320hash'],
		id_sq: song['sqhash'],
		album_audio_id: song['album_audio_id'],
		name: song['songname'],
		duration: song['duration'] * 1000,
		album: { id: song['album_id'], name: song['album_name'] },
	};
};

const search = (info) => {
	const url =
		'http://mobilecdn.kugou.com/api/v3/search/song?keyword=' +
		encodeURIComponent(info.keyword) +
		'&page=1&pagesize=10';

	return request('GET', url)
		.then((response) => response.json())
		.then((jsonBody) => {
			const list = jsonBody.data.info.map(format);
			const matched = select(list, info);
			return matched ? matched : Promise.reject();
		})
		.catch(() => insure().kugou.search(info));
};

const single = (song, format) => {
	const getHashId = () => {
		switch (format) {
			case 'hash':
				return song.id;
			case 'hqhash':
				return song.id_hq;
			case 'sqhash':
				return song.id_sq;
			default:
				break;
		}
		return '';
	};

  const url = 
      `https://wwwapi.kugou.com/yy/index.php?r=play/getdata&callback=jQuery19109264784535129995_${+new Date()}` +
      `&hash=${getHashId()}&platid=4&album_id=${song.album.id}&album_audio_id=${song.album_audio_id}` + 
      `&dfid=${cookieConfig.kg_dfid}&appid=1014&mid=${cookieConfig.kg_mid}&_=${+new Date()}`;
	return request('GET', url, headers)
		.then((response) => response.body())
		.then((bodyString) => {
      const jsonString = bodyString.slice(41, -2).replace(/\r/g,"\\r").replace(/\n/g,"\\n")
      const jsonBody = JSON.parse(decodeURIComponent(jsonString));
      const { data } = jsonBody || {};
      return data.play_url || data.play_backup_url || Promise.reject()
    })
};

const track = (song) =>
	Promise.all(
		['sqhash', 'hqhash', 'hash']
			.slice(select.ENABLE_FLAC ? 0 : 1)
			.map((format) => single(song, format).catch(() => null))
	)
		.then((result) => result.find((url) => url) || Promise.reject())
		.catch(() => insure().kugou.track(song));

const check = info => cache(search, info).then(track)

module.exports = {check, search}