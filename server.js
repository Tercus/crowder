'use strict';
const hapi = require('hapi')
const routes = require('./routes/routes.js')
const controller = require('./controller/controller.js')


//Initialize the database and create it if it doesn't exist already. That way the other parts don't have to
const fs = require('fs')
const sqlite3 = require("sqlite3").verbose()
var file = "test.db"
var db = new sqlite3.Database(file)
db.run("CREATE TABLE if not exists videos (UID INT, title TEXT, desc TEXT, date INT, magnet TEXT)")
db.close()

//Initialize the seeding of the files


//Initialize server and set port
const server = new hapi.Server()
server.connection({ port: 3000 })

//Initialize routes
routes.init(server)

//Start server or throw error on failure
server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
});