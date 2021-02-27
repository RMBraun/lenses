const { loadGlobal, TYPES, getConstructorName } = require('./helpers')

const apply = (name) => (...options) => (input) => {
  if (name == null || name.trim() == null) {
    throw new Error('no prototype function name specified')
  }

  if (input == null) {
    return input
  }

  if (TYPES.FUNCTION.is(input[name])) {
    throw new Error(`The function ${name} does not exist for type ${getConstructorName(input)}`)
  }

  return input[name](...options)
}

//Create common curried version of Array and Object prototypes
//To be used in conjunction with 'get'
module.exports.apply = apply
module.exports.concat = apply('concat')
module.exports.entries = apply('entries')
module.exports.every = apply('every')
module.exports.fill = apply('fill')
module.exports.filter = apply('filter')
module.exports.find = apply('find')
module.exports.findIndex = apply('findIndex')
module.exports.forEach = apply('forEach')
module.exports.includes = apply('includes')
module.exports.indexOf = apply('indexOf')
module.exports.join = apply('join')
module.exports.keys = apply('keys')
module.exports.lastIndexOf = apply('lastIndexOf')
module.exports.map = apply('map')
module.exports.reduce = apply('reduce')
module.exports.reverse = apply('reverse')
module.exports.slice = apply('slice')
module.exports.some = apply('some')
module.exports.sort = apply('sort')
module.exports.splice = apply('splice')
module.exports.values = apply('values')
module.exports.assign = apply('assign')

//for browser static import
loadGlobal(module.exports)
