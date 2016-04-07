'use strict';

module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent')
		const fs = require('fs')
		var client = new WebTorrent()
		
		console.log(request.method)
		if(request.method === 'get') {
			//just show the upload form
			reply (template.filled('upload', {}))
		} else {
			//start downloading the file
			var download = decodeURIComponent(request.payload)
			console.log('infoHash of torrent to download: ' + download2)
			var opts = {
				path: './storage/' + download + '/',
				announce: ['http://localhost:8080', 'udp://localhost:8080']
				}
			client.add(download, function (torrent) {
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
			client.on('torrent', function (torrent) {
				console.log('BAH, torrent')
			})
		}
    }
}