var WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()
var fs = require('fs')

download = '1be670efcaa7113a086bdb547f451fc0f1d81da7'
console.log('download: ' + download)
client.add(download, { path: './download/' }, function (torrent) {
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
