const { loadGlobal, getConstructorName, OPERATION_TYPES } = require('./helpers')

//Curried version
const _set = (...operationInputs) => (input) => {
  //default return
  if (operationInputs.length === 0) {
    return input
  }

  const rawOperations = [...operationInputs]
  const value = rawOperations.pop()
  let objectRef = input

  rawOperations
    //operation validation
    .map((operation, i) => {
      const operationType = OPERATION_TYPES.getType(operation)

      if (operationType !== OPERATION_TYPES.STRING && operationType !== OPERATION_TYPES.INDEX) {
        throw new Error(
          `Invalid Set operation at index: ${i}: expecting a String or Number but received ${getConstructorName(
            operation
          )}`
        )
      }

      return {
        operation,
        operationType,
        defaultValue: OPERATION_TYPES.getType(rawOperations[i + 1]) === OPERATION_TYPES.STRING ? {} : [],
      }
    })
    //operation execution
    .forEach(({ operation, defaultValue }, i, operations) => {
      objectRef = objectRef[operation] =
        i === operations.length - 1
          ? getConstructorName(value) === Function.name
            ? value(objectRef[operation])
            : value
          : objectRef[operation] != null
          ? objectRef[operation]
          : defaultValue
    })

  return input
}

module.exports = {
  _set,
  set: (input, ...operationInputs) => _set(...operationInputs)(input),
}

//for browser static import
loadGlobal(module.exports)
