var WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()
var file = './testfile/testfile.jpg'

client.seed(file, function (torrent) {
	console.log('Seeding: ' + file)
	console.log(torrent.infoHash)
})
