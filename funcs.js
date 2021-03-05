const { loadGlobal, getConstructorName, TYPES } = require('./helpers')

const func = (userFunction) => {
  if (!TYPES.FUNCTION.is(userFunction)) {
    throw new Error(`func must take a function as an input, received ${getConstructorName(userFunction)} instead`)
  }
  return (input) => (input == null ? input : userFunction(input))
}

const log = (customInput, prettify = true) => (input) => {
  const output = customInput ? `${customInput} ${input}` : input
  console.log(prettify ? JSON.stringify(output, null, 2) : JSON.stringify(output))
  return input
}

const forceBool = () => (input) => !!input
const forceInt = (...args) => (input) => parseInt(input, ...args)
const forceFloat = (...args) => (input) => parseFloat(input, ...args)
const forceNum = () => (input) => (input == null ? 0 : Number(input).valueOf())
const forceString = (...args) => (input) => JSON.stringify(input, ...args)
const forceParse = (...args) => (input) => JSON.parse(input, ...args)
const forceType = (T, ...args) => (input) => new T(input, ...args)

module.exports.func = func
module.exports.log = log
module.exports.parse = (...args) => func(forceParse(...args))
module.exports.stringify = (...args) => func(forceString(...args))

module.exports.toBool = func(forceBool)
module.exports.toNum = func(forceNum)
module.exports.toInt = (...args) => func(forceInt(...args))
module.exports.toFloat = (...args) => func(forceFloat(...args))
module.exports.toType = (T, ...args) => func(forceType(T, ...args))

module.exports.forceBool = forceBool
module.exports.forceInt = forceInt
module.exports.forceFloat = forceFloat
module.exports.forceNum = forceNum
module.exports.forceString = forceString
module.exports.forceType = forceType

//for browser static import
loadGlobal(module.exports)
