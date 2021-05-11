const { loadGlobal, TYPES, getConstructorName } = require('./helpers')

const _call = (name) => (...options) => (input) => {
  if (name == null || name.trim() == null) {
    throw new Error('no prototype function name specified')
  }

  if (input == null) {
    return input
  }

  if (!TYPES.FUNCTION.is(input[name])) {
    throw new Error(`The function ${name} does not exist for type ${getConstructorName(input)}`)
  }

  return input[name](...options)
}

const isEmpty = (input) => {
  if (input == null) {
    return true
  } else if (TYPES.STRING.is(input)) {
    return !input || input == '' || input.length === 0
  } else if (TYPES.ARRAY.is(input)) {
    return input.length === 0
  } else if (TYPES.OBJECT.is(input)) {
    return Object.keys(input).length === 0
  } else {
    return false
  }
}

//Create common curried version of Array, Object, and String prototypes
//To be used in conjunction with 'get'
module.exports.call = (name, ...options) => (input) => _call(name)(...options)(input)
module.exports._call = _call
module.exports.concat = _call('concat')
module.exports.entries = () => (input) => (input == null ? input : Object.entries(input))
module.exports.every = _call('every')
module.exports.fill = _call('fill')
module.exports.filter = _call('filter')
module.exports.find = _call('find')
module.exports.findIndex = _call('findIndex')
module.exports.forEach = _call('forEach')
module.exports.includes = _call('includes')
module.exports.indexOf = _call('indexOf')
module.exports.join = _call('join')
module.exports.keys = () => (input) => (input == null ? input : Object.keys(input))
module.exports.lastIndexOf = _call('lastIndexOf')
module.exports.map = _call('map')
module.exports.push = _call('push')
module.exports.reduce = _call('reduce')
module.exports.reverse = _call('reverse')
module.exports.slice = _call('slice')
module.exports.some = _call('some')
module.exports.sort = _call('sort')
module.exports.splice = _call('splice')
module.exports.values = () => (input) => (input == null ? input : Object.values(input))
module.exports.assign = _call('assign')
module.exports.trim = _call('trim')
module.exports.toLowerCase = _call('toLowerCase')
module.exports.toUpperCase = _call('toUpperCase')
module.exports.is = (b) => (a) => a === b || Object.is(a, b)
module.exports.replace = _call('replace')
module.exports.replaceAll = _call('replaceAll')
module.exports.padEnd = _call('padEnd')
module.exports.padStart = _call('padStart')
module.exports.repeat = _call('repeat')
module.exports.charAt = _call('charAt')
module.exports.charCodeAt = _call('charCodeAt')
module.exports.endsWith = _call('endsWith')
module.exports.startsWith = _call('startsWith')
module.exports.match = _call('match')
module.exports.matchAll = _call('matchAll')
module.exports.normalize = _call('normalize')
module.exports.split = _call('split')
module.exports.substring = _call('substring')
module.exports.toLowerCase = _call('toLowerCase')
module.exports.toUpperCase = _call('toUpperCase')
module.exports.trim = _call('trim')
module.exports.trimStart = _call('trimStart')
module.exports.trimEnd = _call('trimEnd')

module.exports.isEmpty = () => (input) => isEmpty(input)
module.exports.isNotEmpty = () => (input) => !isEmpty(input)

//for browser static import
loadGlobal(module.exports)
