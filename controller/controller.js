// load_controller is the type of controller to load. It then requires
// said controller and returns its 'load' property, which in the end is
// a function
module.exports = {
  use: function (load_controller) {
    var controller = require('./' + load_controller + '_controller.js')
    return (controller.load)
  }
}
