module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent')
		const fs = require('fs')
		const sqlite3 = require('sqlite3').verbose()
		var client = new WebTorrent()
		var file = 'test.db'
		var db = new sqlite3.Database(file)
		var parseTorrent = require('parse-torrent')
		
		if(request.method == 'get') {
			reply (template.filled('upload', {}))
		} else {
			console.log('Torrent to download:', request.payload.magnet)
			db.all("INSERT INTO videos VALUES ('','" + request.payload.title + "','" + request.payload.desc + "','','" + request.payload.magnet + "')")
			db.close()
			
			
			parseTorrent.remote(request.payload.magnet, function (err, parsedTorrent) {
				if (err) {
					console.log('Parsing torrent failed: ' + err)
				}
				client.add(request.payload.magnet, { path: './storage/' + parsedTorrent.infoHash + '/' }, function (torrent) {
					torrent.files.forEach(function (file) {
						console.log('Started saving ' + file.name)
						file.getBuffer(function (err, buffer) {
							if (err) {
								console.error('Error downloading ' + file.name)
								return
							}
							fs.writeFile(file.name, buffer, function (err) {
								if (err) {
									console.error('Error saving ' + file.name)
									return
								}
							})
						})
					})
				})
				client.on('torrent', function (torrent) {
					torrent.on('done', function () {
						console.log('done downloading.')
					})
					torrent.on('download', function(chunkSize){
						//console.log('chunk size: ' + chunkSize);
						//console.log('total downloaded: ' + torrent.downloaded);
						//console.log('download speed: ' + torrent.downloadSpeed);
						console.log('progress: ' + torrent.progress);
						//console.log('======');
					})
					reply(template.filled('upload', {title: request.payload.title}))
				})
			})
		}
    }
}