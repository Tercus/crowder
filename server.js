'use strict';
const hapi = require('hapi')
const routes = require('./routes/routes.js')
const controller = require('./controller/controller.js')

//Initialize server and set port
const server = new hapi.Server();
server.connection({ port: 3000 });

//Initialize routes
routes.init(server)

//Start server or throw error on failure
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});