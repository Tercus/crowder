module.exports = {
	load: function (request, reply) {
		const template = require('../template.js')
		reply (template.filled('upload', {}))
    }
}