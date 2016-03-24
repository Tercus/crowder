module.exports = {
	load: function (request, reply) {
		const fs = require('fs')
		const sqlite3 = require('sqlite3').verbose()
		const template = require('../template.js')
		var file = 'test.db'
		var exists = fs.existsSync(file)
		var db = new sqlite3.Database(file)
		
		if(request.payload) {
			console.log('Wowzie, someone talked to me!', request.payload);
		}
		db.serialize(function() {
			if(!exists) {
				db.run('CREATE TABLE Stuff (thing TEXT)')
			}
			  
			var stmt = db.prepare('INSERT INTO Stuff VALUES (?)')
			//Insert random data
			var rnd
			for (var i = 0; i < 1; i++) {
				rnd = Math.floor(Math.random() * 10000000)
				stmt.run('Thing #' + rnd)
			}
			stmt.finalize()
		});
		db.close()
		
        reply (template.filled('upload', {}))
    }
}