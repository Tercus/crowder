'use strict';
module.exports = {
  init: function (server) {
    var controller = require('../controller/controller.js')
    server.route({
      method: 'GET',
      path: '/',
      handler: controller.use('default')
    })
    server.route({
      method: 'GET',
      path: '/watch/{video?}',
      handler: controller.use('video')
    })
    server.route({
      method: 'GET',
      path: '/visit/{user?}',
      handler: controller.use('user')
    })
    server.route({
      method: 'GET',
      path: '/upload',
      handler: controller.use('upload')
    })
  }
}
