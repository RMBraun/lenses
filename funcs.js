const { loadGlobal, getConstructorName } = require('./helpers')

module.exports.log = (customInput, prettify = true) => (input) => {
  const output = customInput ? `${customInput} ${input}` : input

  console.log(prettify ? JSON.stringify(output, null, 2) : JSON.stringify(output))

  return input
}

module.exports.func = (userFunction) => {
  if (getConstructorName(userFunction) !== Function.name) {
    throw new Error(`func must take a function as an input, received ${getConstructorName(userFunction)} instead`)
  }

  return (input) => (input == null ? input : userFunction(input))
}

module.exports.parse = (input) => (input == null ? input : JSON.parse(input))

module.exports.stringify = (input) => (input == null ? input : JSON.stringify(input))

//for browser static import
loadGlobal(module.exports)
