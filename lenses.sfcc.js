const { loadGlobal } = require('./helpers')

//add all dependencies
module.exports = {
  ...require('./get'),
  ...require('./set'),
  ...require('./protos.sfcc'),
  ...require('./funcs'),
}

module.exports.SFCC = require('./sfccHelpers')

//for browser static import
loadGlobal(module.exports)
