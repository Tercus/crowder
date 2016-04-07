const WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()

download = 'magnet:?xt=urn:btih:b8fee5e1dc746256587df78879d440c3979af750&dn=maxresdefault.jpg&tr=udp%3A%2F%2Fexodus.desync.com%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&tr=wss%3A%2F%2Ftracker.webtorrent.io'
download2 = decodeURIComponent(download)

console.log('Magnet to download: ' + download2)
client.add(download2, function (torrent) {
	console.log('added torrent')
	torrent.files.forEach(function (file) {
		console.log('Started saving ' + file.name)
		file.getBuffer(function (err, buffer) {
			if (err) {
				console.error('Error downloading ' + file.name)
				return
			}
				fs.writeFile(file.name, buffer, function (err) {
				console.error('Error saving ' + file.name)
			})
		})
	})
})