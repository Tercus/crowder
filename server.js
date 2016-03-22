'use strict';
const Mustache = require('mustache')
const Hapi = require('hapi')
const fs = require('fs')
const routes = require('./routes/routes.js')
var controller = require('./controller/controller.js')

//Initialize server and set port
const server = new Hapi.Server();
server.connection({ port: 3000 });

//Load template from a file into a variable
//var template = fs.readFileSync('template.html').toString()

//Apply mustache to the template and save the output in variable
//var output = Mustache.render(template, videos.filltemplate());

//Init Routes
routes.init(server)

//Start server and throw error on failure
server.start((err) => {
    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});