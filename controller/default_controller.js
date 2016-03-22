module.exports = {
	load: function (request, reply) {
		const fs = require('fs')
		const sqlite3 = require("sqlite3").verbose()
		const template = require('../template.js')
		var file = "test.db";
		var exists = fs.existsSync(file);
		var db = new sqlite3.Database(file);
		
		
		db.serialize(function() {
			if(!exists) {
				console.log('Oops, database is missing');
			}
			db.all("SELECT rowid AS id, thing FROM Stuff", function (err,rows) {
				var data = { data: rows }
				reply (template.filled('default', data))
				//console.log(data);
			});
		});
		db.close();
    }
	
}