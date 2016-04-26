'use strict';
module.exports = {
  load: function (request, reply) {
    const template = require('../template.js')
    
    if(request.method === 'POST') reply ('NO')
    //just show the upload form
    reply (template.filled('upload', {}))
  }
}
