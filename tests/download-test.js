var WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()
var fs = require('fs')

var sintel = 'https://webtorrent.io/torrents/sintel.torrent'
var magnet = 'magnet:?xt=urn:btih:c3ac6be00f67c88118c71e4971d12c793b99b954&dn=LtUxcQ1.jpg&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io'

var download = magnet
console.log('download: ' + download)
client.add(download, { path: './download/' }, function (torrent) {
	console.log('added torrent')
})
client.on('torrent', function(torrent) {
	console.log('Established connection')
	torrent.on('done', function() {
		console.log('Finished downloading file')
	})
	torrent.on('download', function(chunksize) {
		console.log('progress: ' + torrent.progress)
	})
})
