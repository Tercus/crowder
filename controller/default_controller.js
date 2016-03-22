module.exports = {
	load: function (request, reply) {
		const fs = require('fs')
		const Mustache = require('mustache')
		var template = fs.readFileSync('./templates/default_template.html').toString()
		const sqlite3 = require("sqlite3").verbose();
		var file = "test.db";
		var exists = fs.existsSync(file);
		var db = new sqlite3.Database(file);
		
		
		db.serialize(function() {
			if(!exists) {
				console.log('Oops, database is missing');
			}
			db.all("SELECT rowid AS id, thing FROM Stuff", function (err,rows) {
				var content = { data: rows }
				var output = Mustache.render(template, content);
				reply (output)
				console.log(content);
			});
		});
		db.close();
		
		
		//var output = Mustache.render(template, content);
        //reply (output)
        //reply ('test')
    }
	
}