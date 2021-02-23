const { loadGlobal, getConstructorName, OPERATION_TYPES } = require('./helpers')

const getProperty = (property, source, i) => {
  if (source == null) {
    return source
  }

  if (getConstructorName(source) !== Object.name) {
    throw new Error(`At index ${i}: cannot get property for a non object`)
  }

  return source[property]
}

const getIndex = (index, source, i) => {
  if (source == null) {
    return source
  }

  if (getConstructorName(source) !== Array.name) {
    throw new Error(`At index ${i}: cannot get index for a non array object`)
  }

  return source[index]
}

const applyFunction = (func, source, i) => {
  if (getConstructorName(func) !== Function.name) {
    throw new Error(`At index ${i}: cannot apply function since it is not a function`)
  }

  return func(source)
}

const performOperation = ({ operation, operationType }, source, i) => {
  if (source == null) {
    if (operationType === OPERATION_TYPES.STRING || operationType === OPERATION_TYPES.INDEX) {
      return source
    }
  }

  if (operationType === OPERATION_TYPES.STRING) {
    return getProperty(operation, source, i)
  } else if (operationType === OPERATION_TYPES.INDEX) {
    return getIndex(operation, source, i)
  } else if (operationType === OPERATION_TYPES.FUNCTION) {
    return applyFunction(operation, source, i)
  }

  return source
}

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
        const operationType = OPERATION_TYPES.getType(operation)

        if (operationType === OPERATION_TYPES.INVALID) {
          throw new Error(
            `Invalid Get operation at index ${i}: expecting String, Index, or Function but received ${getConstructorName(
              operation
            )}`
          )
        }

        return {
          operation,
          operationType,
        }
      })
      //operation execution
      .reduce((acc, operationInfo, i) => {
        if (operationInfo) {
          return performOperation(operationInfo, acc, i)
        } else {
          return acc
        }
      }, input)
  )
}

const defaults = (defaultValue) => (input) => {
  return input == null ? defaultValue : input
}

module.exports = {
  _get,
  defaults,
  get: (input, ...operationInputs) => _get(...operationInputs)(input),
}

//for browser static import
loadGlobal(module.exports)
