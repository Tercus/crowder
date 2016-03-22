module.exports = {
	load: function (request, reply) {
        reply ('Hello Person. You want to visit: ' + encodeURIComponent(request.params.user) + '!')
    }
}