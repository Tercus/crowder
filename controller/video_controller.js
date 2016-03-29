module.exports = {
	load: function (request, reply) {
		const fs = require('fs')
		const sqlite3 = require("sqlite3").verbose()
		const template = require('../template.js')
		var file = "test.db"
		var db = new sqlite3.Database(file)
		var videoID = encodeURIComponent(request.params.video)
		
		db.all("SELECT rowid AS vidID, * FROM videos WHERE vidID=" + videoID, function (err, row){
			reply (template.filled('video', row[0]))
		})
		db.close()
    }
}