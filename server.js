'use strict';
const hapi = require('hapi')
const hserver = new hapi.Server()
const routes = require('./routes/routes.js')
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose()


//Initialize the database and create it if it doesn't exist already. That way the other parts don't have to
var file = "test.db"
var db = new sqlite3.Database(file)
db.run("CREATE TABLE if not exists videos (UID INT, title TEXT, desc TEXT, date INT, magnet TEXT)")
db.close()

//Initialize hapi-server and set port
hserver.connection({ port: 80 })

//Initialize routes
routes.init(hserver)

//Start hapi-server or throw error on failure
hserver.start((err) => {
    if (err) throw err
    console.log('Server running at:', hserver.info.uri)
})
