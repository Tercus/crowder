'use strict';

module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent-hybrid')
		const fs = require('fs')
		var client = new WebTorrent()
		
		var util = require("util")
		
		console.log(request.method)
		if(request.method === 'get') {
			//just show the upload form
			reply (template.filled('upload', {}))
		} else {
			//start downloading the file
			var download = request.payload
			var opts = {
				path: './storage/' + download + '/',
				announce: ['http://localhost:8080', 'udp://localhost:8080', 'ws://localhost:8080', 'wss://localhost:8080']
				}
			client.add(download, opts, function (torrent) {
				console.log('added torrent')
				torrent.on('done', function() {
					console.log('Torrent downloaded')
					savetorrent(download)
				})
			})
		}
		
		function savetorrent (download) {
			console.log('Gotta save this: ' + download)
		}
    }
}
