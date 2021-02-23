const { loadGlobal, getConstructorName } = require('./helpers')

const _apply = (name) => (...options) => (input) => {
  if (name == null || name.trim() == null) {
    throw new Error('no prototype function name specified')
  }

  if (input == null) {
    return input
  }

  if (getConstructorName(input[name]) !== Function.name) {
    throw new Error(`The function ${name} does not exist for type ${getConstructorName(input)}`)
  }

  return input[name](...options)
}

//Create common curried version of Array and Object prototypes
//To be used in conjunction with 'get'
module.exports._apply = _apply
module.exports.apply = (input, name, ...operations) => _apply(name)(...operations)(input)
module.exports.concat = _apply('concat')
module.exports.entries = _apply('entries')
module.exports.every = _apply('every')
module.exports.fill = _apply('fill')
module.exports.filter = _apply('filter')
module.exports.find = _apply('find')
module.exports.findIndex = _apply('findIndex')
module.exports.forEach = _apply('forEach')
module.exports.includes = _apply('includes')
module.exports.indexOf = _apply('indexOf')
module.exports.join = _apply('join')
module.exports.keys = _apply('keys')
module.exports.lastIndexOf = _apply('lastIndexOf')
module.exports.map = _apply('map')
module.exports.reduce = _apply('reduce')
module.exports.reverse = _apply('reverse')
module.exports.slice = _apply('slice')
module.exports.some = _apply('some')
module.exports.sort = _apply('sort')
module.exports.splice = _apply('splice')
module.exports.values = _apply('values')
module.exports.assign = _apply('assign')

//for browser static import
loadGlobal(module.exports)
