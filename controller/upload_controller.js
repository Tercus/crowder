'use strict';

module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		const WebTorrent = require('webtorrent-hybrid')
		var client = new WebTorrent()
		const sqlite3 = require("sqlite3").verbose()
 		var file = 'test.db'
 		var db = new sqlite3.Database(file)		
		
		if(request.method === 'POST') reply ('NO')
    //just show the upload form
		reply (template.filled('upload', {}))
  }
}
