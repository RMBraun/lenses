module.exports.find = (callback, thisRef) => (input) => {
  for (var i = 0; i < input.length; i++) {
    if (callback.call(thisRef, input[i], i, input)) {
      return input[i]
    }
  }
}
module.exports.map = (callback, thisRef) => (input) => {
  const output = []
  for (var i = 0; i < input.length; i++) {
    output.push(callback.call(thisRef, input[i], i, input))
  }
  return output
}
module.exports.forEach = (callback, thisRef) => (input) => {
  for (var i = 0; i < input.length; i++) {
    callback.call(thisRef, input[i], i, input)
  }
}
module.exports.every = (callback, thisRef) => (input) => {
  for (var i = 0; i < input.length; i++) {
    if (!callback.call(thisRef, input[i], i, input)) {
      return false
    }
  }
  return true
}
module.exports.some = (callback, thisRef) => (input) => {
  for (var i = 0; i < input.length; i++) {
    if (callback.call(thisRef, input[i], i, input)) {
      return true
    }
  }
  return false
}
module.exports.getIndex = (index) => (input) => {
  return input[index]
}
