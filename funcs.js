const { loadGlobal, getConstructorName, TYPES } = require('./helpers')

const func = userFunction => {
  if (!TYPES.FUNCTION.is(userFunction)) {
    throw new Error(`func must take a function as an input, received ${getConstructorName(userFunction)} instead`)
  }
  return input => (input == null ? input : userFunction(input))
}

const log =
  (customInput, prettify = true) =>
  input => {
    const output = customInput ? `${customInput} ${input}` : input
    console.log(prettify ? JSON.stringify(output, null, 2) : JSON.stringify(output))
    return input
  }

// prettier-ignore
const forceBool = () => (input) => !!input
// prettier-ignore
const forceInt = (...args) => (input) => parseInt(input, ...args)
// prettier-ignore
const forceFloat = (...args) => (input) => parseFloat(input, ...args)
// prettier-ignore
const forceNum = () => (input) => (input == null ? 0 : Number(input).valueOf())
// prettier-ignore
const forceString = (...args) => (input) => JSON.stringify(input, ...args)
// prettier-ignore
const forceParse = (...args) => (input) => JSON.parse(input, ...args)
// prettier-ignore
const forceType = (T, ...args) => input => new T(input, ...args)

module.exports.func = func
module.exports.log = log
module.exports.parse = (...args) => func(forceParse(...args))
module.exports.stringify = (...args) => func(forceString(...args))

module.exports.toBool = (...args) => func(forceBool(...args))
module.exports.toNum = (...args) => func(forceNum(...args))
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
