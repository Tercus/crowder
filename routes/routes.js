module.exports = {
	init: function (server, controller) {
		var controller = require('../controller/controller.js')
		server.route({
			method: 'GET',
			path: '/',
			handler: controller.main('default')
		})
		server.route({
			method: 'GET',
			path: '/watch/{video}',
			handler: controller.main('video')
		})
		server.route({
			method: 'GET',
			path: '/visit/{user}',
			handler: controller.main('user')
		})
		server.route({
			method: 'GET',
			path: '/upload',
			handler: controller.main('upload')
		})
		server.route({
			method: 'POST',
			path: '/upload',
			handler: controller.main('uploaded')
		})
	}
}