module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		data = {
			video: encodeURIComponent(request.params.video)
		}
		reply (template.filled('video', data))
    }
}