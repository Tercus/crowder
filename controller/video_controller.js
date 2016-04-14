module.exports = {
  load: function (request, reply) {
    const fs = require('fs')
    const sqlite3 = require("sqlite3").verbose()
    const template = require('../template.js')
    var file = "test.db"
    var db = new sqlite3.Database(file)
    
    db.all("SELECT * FROM videos WHERE infoHash='" + request.params.video + "'", function (err, row){
      if (err) console.log('Error: ' + err)
      reply (template.filled('video', row[0]))
    })
    db.close()
  }
}
