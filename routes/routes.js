module.exports = {
	init: function (server, controller) {
		var controller = require('../controller/controller.js')
		//referr to the ./controller/controller.js that is loaded in the server.js and 
		//load the handler that applies to the route
		/*server.route({
			method: 'GET',
			path: '/',
			handler: controller.main
		})

		server.route({
			method: 'GET',
			path: '/visit/{user}',
			handler: controller.user
		})

		server.route({
			method: 'GET',
			path: '/watch/{video}',
			handler: controller.video
		})*/
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
	}
}