module.exports = {
  main: function (load_controller) {
    var controller = require('./' + load_controller + '_controller.js')
    return (controller.load)
  }
}
