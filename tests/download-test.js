var WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()
var fs = require('fs')

var sintel = 'https://webtorrent.io/torrents/sintel.torrent'
var magnet = 'magnet:?xt=urn:btih:c3ac6be00f67c88118c71e4971d12c793b99b954&dn=LtUxcQ1.jpg&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io'
var torrentfile = './LtUxcQ1.torrent'


var download = magnet
console.log('download: ' + download)
var torrent = client.add(download, { path: './download/' })
addTorrentEvents(torrent)

function addTorrentEvents(torrent) {
	torrent.on('warning', (err) =>
		console.log('warning: ', err.message))
	torrent.on('error', (err) =>
		console.log('error: ', err.message))
	torrent.on('infoHash', () =>
		console.log('infohash: ', torrent.infoHash))
	torrent.on('metadata', torrentMetadata)
	torrent.on('ready', torrentReady)
	torrent.on('done', torrentDone)
	torrent.on('wire', torrentwire)

	function torrentMetadata () {
		console.log('metadata received')
	}

	function torrentReady () {
		console.log('Torrent ready to download')
	}

	function torrentDone () {
		console.log('Torrent downloaded')
	}
	
	function torrentwire () {
		console.log('getting a wire')
	}
}