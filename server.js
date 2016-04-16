'use strict';
const hapi = require('hapi')
const server = new hapi.Server()
const routes = require('./routes/routes.js')

//Initialize hapi-server and set port
server.connection({ port: 80, labels: ['web'] })
server.connection({ port: 81, labels: ['tracker'] });
server.connection({ port: 82, labels: ['seed'] })

//Add socket.io to server listener
var trackerio = require('socket.io')(server.select('tracker').listener)
var seedio = require('socket.io')(server.select('seed').listener)

//events from the tracker
trackerio.on('connection', function (socket) {
  socket.emit('Oh hii!')
  socket.on('burp', function () {
    console.log('Did you just burp?!')
    socket.emit('what','*blank stare*')
  })
  console.log('New tracker: ' + socket.id)
  seedio.clients(function(error, clients){
    if (error) throw error;
    console.log('All tracker: ' + clients) 
  })
})

//events from the seed
seedio.on('connection', function (socket) {
  socket.emit('Oh hii!')
  socket.on('burp', function () {
    console.log('Did you just burp?!')
    socket.emit('what','blank stare')
  })
  console.log('New seed: ' + socket.id)
  seedio.clients(function(error, clients){
    if (error) throw error;
    console.log('All seeds: ' + clients) 
  })
})



//Initialize routes
routes.init(server)

//Start hapi-server or throw error on failure
server.start((err) => {
    if (err) throw err
    console.log('Webserver listening on: ' + server.select('web').info.uri)
    console.log('Tracker events on: ' + server.select('tracker').info.uri)
    console.log('Seed events on: ' + server.select('seed').info.uri)
})
