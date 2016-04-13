'use strict';

module.exports = {
	load: function (request, reply) {
		const WebTorrent = require('webtorrent-hybrid')
		var client = new WebTorrent()
		const sqlite3 = require("sqlite3").verbose()
 		var file = 'test.db'
 		var db = new sqlite3.Database(file)
    
//TODO:
// - add check if torrent has already been added by another user
// - add if sent POST request is actually valid. Trust no-one.
    if(request.method === 'get') return reply ('Wrong request method')
    var sendData = request.payload
		var opts = {
      path: './storage/' + sendData.infoHash + '/',
      announce: ['ws://localhost:8080']
      }
    client.add(sendData.infoHash, opts)
    client.on('error', function (err) { handleerror(err) })
    client.on('warning', function (err) { handleerror(err) })
    client.on('torrent', function(torrent){
      console.log('Added torrent: ' + torrent.infoHash)
      torrent.on('download', function (chunkSize) {
        console.log('progress: ' + (torrent.progress * 100).toFixed(2) + '%')
      })
      torrent.on('done', function () {
        savetodb(torrent)
        reply('done')
      })
    })

//TODO: 
// - add an option do make the file public before upload is finished
    function savetodb (torrent) {
      console.log('Torrent downloaded')
      db.all("INSERT INTO videos VALUES ('" + sendData.infoHash + "', 123,'" + sendData.title + "','" + sendData.desc + "','" + Date.now() + "')")
      db.close()
    }
    
    function handleerror (err) {
      if(err) {
        console.log(err)
        return reply (err)
    }
    }

  }
}
