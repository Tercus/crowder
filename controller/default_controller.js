module.exports = {
	load: function (request, reply) {
		const fs = require('fs')
		const Mustache = require('mustache')
		var template = fs.readFileSync('template.html').toString()
		var content = {
			title: "Joe",
			calc: function () {
				return 2 + 4;
			},
			smiley: ":P"
		}
		var output = Mustache.render(template, content);
        reply (output)
    }
	
}