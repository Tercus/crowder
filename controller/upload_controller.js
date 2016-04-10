'use strict';

module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent-hybrid')
		const fs = require('fs')
		var client = new WebTorrent()
		const sqlite3 = require("sqlite3").verbose()
 		var file = 'test.db'
 		var db = new sqlite3.Database(file)		
		
		console.log(request.method)
		if(request.method === 'get') {
			//just show the upload form
			reply (template.filled('upload', {}))
		} else {
			//TODO: add check if torrent has already been added by another user
			//		so, check for the infoHash in the database and return error
			var download = request.payload
			var opts = {
				path: './storage/' + download + '/',
				announce: ['http://localhost:8080', 'udp://localhost:8080', 'ws://localhost:8080']
				}
			client.add(download, opts, function (torrent) {
				console.log('added torrent')
				torrent.on('download', function (chunkSize) {
					console.log('progress: ' + (torrent.progress * 100).toFixed(2) + '%')
				})
				torrent.on('done', function (torrent) {
					console.log('Torrent downloaded')
					db.all("INSERT INTO videos VALUES ('" + download + "', '','Test','test desc','')")
					db.close()
				})
			})
		}
    }
}
