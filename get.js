const { loadGlobal, getConstructorName, TYPES, getOperationType } = require('./helpers')

const getProperty = (property, source, i) => {
  if (source == null) {
    return source
  }

  if (!TYPES.OBJECT.is(source)) {
    throw new Error(`At index ${i}: cannot get property for a non Object type`)
  }

  return source[property]
}

const getIndex = (index, source, i) => {
  if (source == null) {
    return source
  }

  if (!TYPES.ARRAY.is(source)) {
    throw new Error(`At index ${i}: cannot get index for a non Array type`)
  }

  return source[index]
}

const applyFunction = (func, source, i) => {
  if (!TYPES.FUNCTION.is(func)) {
    throw new Error(`At index ${i}: cannot apply function since it is not a Function`)
  }

  return func(source)
}

const performOperation = ({ operation, type }, source, i) =>
  source == null
    ? !TYPES.FUNCTION.is(type)
      ? source
      : applyFunction(operation, source, i)
    : TYPES.STRING.is(type)
    ? getProperty(operation, source, i)
    : TYPES.NUMBER.is(type)
    ? getIndex(operation, source, i)
    : TYPES.FUNCTION.is(type)
    ? applyFunction(operation, source, i)
    : source

//Curried version
const _get = (...operationInputs) => (input) => {
  //default return
  if (operationInputs.length === 0) {
    return input
  }

  const operations = [...operationInputs]

  return (
    operations
      //operation validation
      .map((operation, i) => {
        const type = getOperationType(operation)

        if (TYPES.INVALID.is(type)) {
          throw new Error(
            `Invalid Get operation at index ${i}: expecting String, Number, or Function but received ${getConstructorName(
              operation
            )}`
          )
        }

        return {
          operation,
          type,
        }
      })
      //operation execution
      .reduce((acc, operationInfo, i) => performOperation(operationInfo, acc, i), input)
  )
}

const defaults = (defaultValue) => (input) => {
  return input == null ? defaultValue : input
}

const get = (input, ...operationInputs) => _get(...operationInputs)(input)

module.exports._get = _get
module.exports.defaults = defaults
module.exports.get = get

//for browser static import
loadGlobal(module.exports)
