const { TYPES } = require('./helpers')

const find = (callback, thisRef) => input => {
  for (var i = 0; i < input.length; i++) {
    if (callback.call(thisRef, input[i], i, input)) {
      return input[i]
    }
  }
}

const map = (callback, thisRef) => input => {
  const output = []
  for (var i = 0; i < input.length; i++) {
    output.push(callback.call(thisRef, input[i], i, input))
  }
  return output
}

const forEach = (callback, thisRef) => input => {
  for (var i = 0; i < input.length; i++) {
    callback.call(thisRef, input[i], i, input)
  }
}

const every = (callback, thisRef) => input => {
  for (var i = 0; i < input.length; i++) {
    if (!callback.call(thisRef, input[i], i, input)) {
      return false
    }
  }
  return true
}

const some = (callback, thisRef) => input => {
  for (var i = 0; i < input.length; i++) {
    if (callback.call(thisRef, input[i], i, input)) {
      return true
    }
  }
  return false
}

const getIndex = index => input => {
  return input[index]
}

module.exports[TYPES.ARRAY.toString()] = {
  find,
  map,
  forEach,
  every,
  some,
  getIndex,
}

const values = () => input => {
  const keys = Object.keys(input)
  return keys.map(key => input[key])
}

const entries = () => input => {
  const keys = Object.keys(input)
  return keys.map(key => [key, input[key]])
}

module.exports[TYPES.OBJECT.toString()] = [values, entries]
