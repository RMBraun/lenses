const { loadGlobal, getConstructorName, TYPES, getOperationType } = require('./helpers')

const getChild = (input, operation, defaultValue, i) => {
  if (TYPES.STRING.is(operation) && !TYPES.OBJECT.is(input)) {
    throw new Error(
      `Invalid Set operation at index: ${i}: cannot get key ${operation} from ${getConstructorName(input)}`
    )
  } else if (TYPES.NUMBER.is(operation) && !TYPES.ARRAY.is(input)) {
    throw new Error(
      `Invalid Set operation at index: ${i}: cannot get index ${operation} from ${getConstructorName(input)}`
    )
  } else {
    return Object.prototype.hasOwnProperty.call(input, operation) ? input[operation] : defaultValue
  }
}

//Curried version
const _set =
  (...operationInputs) =>
  input => {
    if (!TYPES.OBJECT.is(input) && !TYPES.ARRAY.is(input) && input != null) {
      throw new Error(
        `Invalid Set input: expecting an Object, Array, null, or undefined but received ${getConstructorName(input)}`
      )
    }

    const rawOperations = [...operationInputs]
    if (input == null) {
      input = TYPES.STRING.is(getOperationType(rawOperations[0])) ? {} : []
    }

    if (rawOperations.length < 2) {
      throw new Error(`Invalid Set: expecting a minimum of 3 arguments but received only ${rawOperations.length + 1}`)
    }

    const value = rawOperations.pop()
    let objectRef = input

    rawOperations
      //operation validation
      .map((operation, i) => {
        const operationType = getOperationType(operation)

        if (!TYPES.STRING.is(operationType) && !TYPES.NUMBER.is(operationType)) {
          throw new Error(
            `Invalid Set operation at index: ${i}: expecting a String or Number but received ${getConstructorName(
              operation
            )}`
          )
        }

        const nextOperationType = getOperationType(rawOperations[i + 1])

        return {
          operation,
          defaultValue: TYPES.STRING.is(nextOperationType) ? {} : [],
        }
      })
      //operation execution
      .forEach(({ operation, defaultValue }, i, operations) => {
        if (!TYPES.OBJECT.is(objectRef) && !TYPES.ARRAY.is(objectRef) && !TYPES.FUNCTION.is(objectRef)) {
          throw new Error(
            `Invalid set operation at index: ${i}: cannot set nested value on non-Object, non-Array, and non-Function entities`
          )
        }

        objectRef = objectRef[operation] =
          i === operations.length - 1
            ? TYPES.FUNCTION.is(value)
              ? value(objectRef[operation])
              : value
            : getChild(objectRef, operation, defaultValue, i)
      })

    return input
  }

const set = (input, ...operationInputs) => _set(...operationInputs)(input)

module.exports._set = _set
module.exports.set = set

//for browser static import
loadGlobal(module.exports)
