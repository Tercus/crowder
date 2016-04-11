'use strict';

module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent-hybrid')
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
      var formData = request.payload
      var download = formData.infoHash
      console.log('Extracted infoHash: ' + download)
      
      var opts = {
				path: './storage/' + download + '/',
				announce: ['ws://localhost:8080']
				}
			client.add(download, opts)
      client.on('torrent', function(torrent){
        console.log('Added torrent: ' + torrent.infoHash)
        torrent.on('download', function (chunkSize) {
					console.log('progress: ' + (torrent.progress * 100).toFixed(2) + '%')
				})
        torrent.on('done', savetodb)
      })
		}
    
    //Save the torrent to the database. I can do that early, because I already have all I know.
    //TODO: Add an option do make the file public before upload is finished
    function savetodb (torrent) {
      console.log('Torrent downloaded')
      db.all("INSERT INTO videos VALUES ('" + download + "', '','Test','test desc','')")
      db.close()
    }
  }
}
