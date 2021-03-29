/*
 * SFCC has implemented Java Collection classes
 * Many native ES5 Array functions do not exist
 * This will add support
 */

const { loadGlobal, TYPES, getConstructorName } = require('./helpers')
const protos = require('./protos')
const polyfills = require('./polyfills')

const Collection = {
  toArray: (input) => {
    const output = []
    const iterator = input.iterator()
    while (iterator.hasNext()) {
      output.push(iterator.next())
    }
    return output
  },
  find: (callback, thisRef) => (input) => {
    const iterator = input.iterator()
    let item
    while (iterator.hasNext()) {
      item = iterator.next()
      if (callback.call(thisRef, item, i, input)) {
        return item
      }
    }
  },
  map: (callback, thisRef) => (input) => {
    const iterator = input.iterator()
    let index = 0
    let result = []
    while (iterator.hasNext()) {
      result.push(callback.call(thisRef, iterator.next(), index, input))
      index++
    }
    return result
  },
  forEach: (callback, thisRef) => (input) => {
    const iterator = input.iterator()
    let index = 0
    while (iterator.hasNext()) {
      callback.call(thisRef, iterator.next(), index, input)
      index++
    }
  },
  concat: (...args) => (input) => {
    const output = Collection.toArray(input)
    for (var i = 0; i < args.length; i++) {
      if (TYPES.ARRAY.is(args[i])) {
        output.push(...args[i])
      } else if (args[i] instanceof dw.util.Collection) {
        output.push(...Collection.toArray(args[i]))
      } else {
        output.push(args[i])
      }
    }
  },
  every: (callback, thisRef) => (input) => {
    const iterator = input.iterator()
    let index = 0
    while (iterator.hasNext()) {
      if (!callback.call(thisRef, iterator.next(), index, input)) {
        return false
      }
      index++
    }
    return true
  },
  some: (callback, thisRef) => (input) => {
    const iterator = input.iterator()
    let index = 0
    while (iterator.hasNext()) {
      if (callback.call(thisRef, iterator.next(), index, input)) {
        return true
      }
      index++
    }
    return false
  },
  getIndex: (index) => (input) => {
    const iterator = input.iterator()
    let i = 0
    while (iterator.hasNext()) {
      if (i === index) {
        return iterator.next()
      }
      iterator.next()
      index++
    }
  },
}

const callbackWrapper = (name, type, sfType) => (...args) => (input) => {
  if (input == null) {
    return input
  }

  if (Object.prototype.hasOwnProperty.call(input, name)) {
    return protos.call(name)(...args)(input)
  } else if (type.is(input)) {
    return polyfills[name](...args)(input)
  } else if (input instanceof sfType) {
    return Collection[name](...args)(input)
  } else {
    throw new Error(`The function ${name} does not exist for type ${getConstructorName(input)}`)
  }
}

const isEmpty = (input) => {
  if (input == null) {
    return true
  } else if (TYPES.STRING.is(input)) {
    return !input || input == '' || input.length === 0
  } else if (TYPES.ARRAY.is(input)) {
    return input.length === 0
  } else if (input instanceof dw.util.Collection) {
    return input.isEmpty()
  } else if (TYPES.OBJECT.is(input)) {
    return Object.keys(input).length === 0
  } else {
    return false
  }
}

//Create common curried version of Array and Object prototypes
//To be used in conjunction with 'get'
module.exports = protos

//Special ES5 support
module.exports.toArray = () => (input) => {
  if (input == null) {
    return input
  }

  if (TYPES.ARRAY.is(input)) {
    return input
  } else if (input instanceof dw.util.Collection) {
    return Collection.toArray(input)
  } else {
    throw new Error(`Cannot convert input of type ${getConstructorName(input)} into Array`)
  }
}

module.exports.find = callbackWrapper('find', TYPES.ARRAY, dw.util.Collection)
module.exports.map = callbackWrapper('map', TYPES.ARRAY, dw.util.Collection)
module.exports.forEach = callbackWrapper('forEach', TYPES.ARRAY, dw.util.Collection)
module.exports.concat = callbackWrapper('concat', TYPES.ARRAY, dw.util.Collection)
module.exports.every = callbackWrapper('every', TYPES.ARRAY, dw.util.Collection)
module.exports.some = callbackWrapper('some', TYPES.ARRAY, dw.util.Collection)
module.exports.getIndex = callbackWrapper('getIndex', TYPES.ARRAY, dw.util.Collection)
module.exports.contains = protos._call('contains')
module.exports.containsAll = protos._call('containsAll')
module.exports.add = protos._call('add')
module.exports.addAll = protos._call('addAll')
module.exports.clear = protos._call('clear')
module.exports.remove = protos._call('remove')
module.exports.removeAll = protos._call('removeAll')

module.exports.isEmpty = () => (input) => isEmpty(input)
module.exports.isNotEmpty = () => (input) => !isEmpty(input)

module.exports.getProp = (key) => (input) => {
  return input != null ? (Object.hasOwnProperty.call(input, key) ? input[key] : undefined) : input
},

//for browser static import
loadGlobal(module.exports)
