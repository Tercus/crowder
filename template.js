module.exports = {
  filled: function (template, data) {
    const fs = require('fs')
    const Mustache = require('mustache')
    var template_file = fs.readFileSync('./templates/' + template + '_template.html').toString()
    return(Mustache.render(template_file, data))
  }
}
