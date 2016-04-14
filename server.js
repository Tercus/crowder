'use strict';
const hapi = require('hapi')
const server = new hapi.Server()
const routes = require('./routes/routes.js')
const fs = require('fs')

//Initialize hapi-server and set port
server.connection({ port: 80 })

//Initialize routes
routes.init(server)

//Start hapi-server or throw error on failure
server.start((err) => {
    if (err) throw err
    console.log('Server running at:', server.info.uri)
})
