'use strict';

module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent-hybrid')
		const fs = require('fs')
		const sqlite3 = require('sqlite3').verbose()
		var client = new WebTorrent()
		var file = 'test.db'
		var db = new sqlite3.Database(file)
		var parseTorrent = require('parse-torrent')
		
		if(request.method === 'get') {
			reply (template.filled('upload', {}))
		} else {
			var download = request.payload
			console.log('infoHash of torrent to download: ' + download)
			var opts = {
				path: './storage/' + download + '/',
				announce: ['ws://localhost:8080']
				}
			//var magnet = parseTorrent.toMagnetURI({ infoHash: download, announce: ['ws://localhost:8080'] })
			//console.log(decodeURIComponent(magnet))
			//client.add(magnet, function (torrent) {
			client.add(download, opts, function (torrent) {
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
		}
    }
}