module.exports = {
	load: function (request, reply) {
		const fs = require('fs')
		const sqlite3 = require("sqlite3").verbose()
		const template = require('../template.js')
		var file = "test.db"
		var db = new sqlite3.Database(file)
		
		db.serialize(function() {
			db.run("CREATE TABLE if not exists videos (VID INT, UID INT, title TEXT, desc TEXT, date INT, magnet TEXT)")
			db.all("SELECT * FROM videos", function (err,rows) {
				var data = { data: rows }
				reply (template.filled('default', data))
			});
		})
		db.close();
    }
	
}