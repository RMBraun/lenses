const getConstructorName = (input) =>
  input == null ? `${input}` : input.constructor ? input.constructor.name : 'Unknown'

const getOperationType = (operation) =>
  TYPES.STRING.is(operation) && operation.trim().length > 0
    ? TYPES.STRING
    : TYPES.NUMBER.is(operation) && operation >= 0
    ? TYPES.NUMBER
    : TYPES.FUNCTION.is(operation)
    ? TYPES.FUNCTION
    : TYPES.INVALID

const isType = (input, type, typeofName, constructor) =>
  input === type ||
  typeof input === typeofName ||
  input instanceof constructor ||
  getConstructorName(input) === constructor.name

const TYPES = {
  STRING: {
    is: (input) => isType(input, TYPES.STRING, 'string', String),
  },
  FUNCTION: {
    is: (input) => isType(input, TYPES.FUNCTION, 'function', Function),
  },
  NUMBER: {
    is: (input) => isType(input, TYPES.NUMBER, 'number', Number),
  },
  OBJECT: {
    is: (input) => isType(input, TYPES.OBJECT, 'object', Object),
  },
  ARRAY: {
    is: (input) => input === TYPES.ARRAY || Array.isArray(input),
  },
  INVALID: {
    is: (input) => input === TYPES.INVALID,
  },
}

//for browser static import
const loadGlobal = (globals = {}) => {
  if (typeof window !== 'undefined') {
    window.L = {
      ...window.L,
      ...globals,
    }
  }
}

module.exports = {
  getConstructorName,
  getOperationType,
  TYPES,
  loadGlobal,
}
