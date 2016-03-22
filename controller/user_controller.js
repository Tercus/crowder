module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		data = {
			user: encodeURIComponent(request.params.user)
		}
		reply (template.filled('user', data))
    }
}