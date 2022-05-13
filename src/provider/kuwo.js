const cache = require('../cache')
const insure = require('./insure')
const select = require('./select')
const crypto = require('../crypto')
const request = require('../request')

const format = (song) => ({
	id: song.musicrid.split('_').pop(),
	name: song.name,
	// duration: song.songTimeMinutes.split(':').reduce((minute, second) => minute * 60 + parseFloat(second), 0) * 1000,
	duration: song.duration * 1000,
	album: { id: song.albumid, name: song.album },
	artists: song.artist
		.split('&')
		.map((name, index) => ({ id: index ? null : song.artistid, name })),
});

const search = (info) => {
	const keyword = encodeURIComponent(info.keyword.replace(' - ', ''));
	const url = `http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key=${keyword}&pn=1&rn=30`;

	const token = Math.random().toString(16).slice(-11).toUpperCase();
	return request('GET', url, {
		referer: `http://www.kuwo.cn/search/list?key=${keyword}`,
		csrf: token,
		cookie: `kw_token=${token}`,
	})
		.then((response) => response.json())
		.then((jsonBody) => {
			if (
				jsonBody &&
				typeof jsonBody === 'object' &&
				'code' in jsonBody &&
				jsonBody.code !== 200
			)
				return Promise.reject();
			const list = jsonBody.data.list.map(format);
			const matched = select(list, info);
			return matched ? matched.id : Promise.reject();
		});
};

const track = (id) => {
	const url = crypto.kuwoapi
		? 'http://mobi.kuwo.cn/mobi.s?f=kuwo&q=' +
		  crypto.kuwoapi.encryptQuery(
				'corp=kuwo&p2p=1&type=convert_url2&sig=0&format=' +
					['flac', 'mp3']
						.slice(select.ENABLE_FLAC ? 0 : 1)
						.join('|') +
					'&rid=' +
					id
		  )
		: 'http://antiserver.kuwo.cn/anti.s?type=convert_url&format=mp3&response=url&rid=MUSIC_' +
		  id; // flac refuse
	// : 'http://www.kuwo.cn/url?format=mp3&response=url&type=convert_url3&br=320kmp3&rid=' + id // flac refuse

	return request('GET', url, { 'user-agent': 'okhttp/3.10.0' })
		.then((response) => response.body())
		.then((body) => {
			const url = (body.match(/http[^\s$"]+/) || [])[0];
			return url || Promise.reject();
		})
		.catch(() => insure().kuwo.track(id));
};

const check = info => cache(search, info).then(track)

module.exports = {check, track}
