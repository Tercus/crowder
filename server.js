'use strict';
const hapi = require('hapi')
const hserver = new hapi.Server()
const routes = require('./routes/routes.js')
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose()
const btserver = require('bittorrent-tracker').Server

//Initialize the database and create it if it doesn't exist already. That way the other parts don't have to
var file = "test.db"
var db = new sqlite3.Database(file)
db.run("CREATE TABLE if not exists videos (UID INT, title TEXT, desc TEXT, date INT, magnet TEXT)")
db.close()

//Initialize the seeding of the files


//Initialize hapi-server and set port
hserver.connection({ port: 3000 })

//Initialize routes
routes.init(hserver)

//Start hapi-server or throw error on failure
hserver.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', hserver.info.uri)
});

//Initialize and start the bittorrent-tracker
var tracker = new btserver({
  udp: true, // enable udp server? [default=true]
  http: true, // enable http server? [default=true]
  ws: true, // enable websocket server? [default=true]
  stats: true, // enable web-based statistics? [default=true]
})

tracker.http
tracker.udp
//Not needed yet
//tracker.ws

tracker.on('error', function (err) {
  // fatal server error!
  console.log(err.message)
})

tracker.on('warning', function (err) {
  // client sent bad data. probably not a problem, just a buggy client.
  console.log(err.message)
})

tracker.on('listening', function () {
  // fired when all requested servers are listening
  console.log('listening on http port:' + tracker.http.address().port)
  console.log('listening on udp port:' + tracker.udp.address().port)
})

// start tracker server listening! Use 0 to listen on a random free port.
tracker.listen(3001, 'localhost')