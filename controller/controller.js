module.exports = {
	main: function (load_controller) {
		var controller = require('./' + load_controller + '_controller.js')
		var test = load_controller + '_controller.load'
		return (controller.load)
	}
	/*main: function (request, reply) {
		reply ('Wee, it works!')
	},
	user: function (request, reply) {
        reply ('Hello Person. You want to visit: ' + encodeURIComponent(request.params.user) + '!')
    },
	video: function (request, reply) {
		reply ('Seems like you want to watch a video')
	}*/
}