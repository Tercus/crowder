'use strict';
const hapi = require('hapi')
const hserver = new hapi.Server()
const routes = require('./routes/routes.js')
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose()

//Catch electron output in virtual screen
var Xvfb = require('xvfb')
var xvfb = new Xvfb()
xvfb.startSync()

//darn webtorrent-hybrid needs that window-less mode
const WebTorrent = require('webtorrent-hybrid')
var client = new WebTorrent()

//Initialize the database and create it if it doesn't exist already. That way the other parts don't have to
var file = "test.db"
var db = new sqlite3.Database(file)
db.serialize(function() {
  db.run("CREATE TABLE if not exists videos (infoHash TEXT, UID INT, title TEXT, desc TEXT, date INT)")
  db.each("SELECT infoHash FROM videos", function (err, row) {
    fs.readdir('./storage/' + row.infoHash + '/', function(err, files){
      //TODO:
      // - Fix this. Right now the CPU usage jumps to 100%
      //client.seed('./storage/' + row.infoHash + '/' + files[0], { announceList: [['ws://localhost:8080']], announce: [['ws://localhost:8080']] })
    })
  })
})
db.close()

/*

  db.all("SELECT infoHash FROM videos", function (err, rows){
    if(err) console.log(err)
    var data = rows.map(function(obj) {
      fs.readdir('./storage/' + obj.infoHash + '/', function(err, files){
        console.log(files)
        client.seed('./storage/' + obj.infoHash + '/' + files, { announceList: [['ws://localhost:8080']], announce: [['ws://localhost:8080']] })
      })      
      return obj.infoHash
    })
    client.on('torrent', function (torrent) {
      console.log(torrent.infoHash)
    })
  })


*/





//Initialize hapi-server and set port
hserver.connection({ port: 80 })

//Initialize routes
routes.init(hserver)

//Start hapi-server or throw error on failure
hserver.start((err) => {
    if (err) throw err
    console.log('Server running at:', hserver.info.uri)
})
