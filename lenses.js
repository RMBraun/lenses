const { loadGlobal } = require('./helpers')

//add all dependencies
module.exports = {
  ...require('./get'),
  ...require('./set'),
  ...require('./protos'),
  ...require('./funcs'),
}

//for browser static import
loadGlobal(module.exports)
