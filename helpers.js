const getConstructorName = (input) =>
  input == null ? `${input}` : input.constructor ? input.constructor.name : 'Unknown'

const OPERATION_TYPES = {
  getType: (operation) => {
    const operationType = getConstructorName(operation)

    if (operationType === OPERATION_TYPES.STRING && operation.trim().length > 0) {
      return OPERATION_TYPES.STRING
    } else if (operationType === OPERATION_TYPES.INDEX && operation >= 0) {
      return OPERATION_TYPES.INDEX
    } else if (operationType === OPERATION_TYPES.FUNCTION) {
      return OPERATION_TYPES.FUNCTION
    } else {
      return OPERATION_TYPES.INVALID
    }
  },
  STRING: String.name, //object drilling
  FUNCTION: Function.name, //manipulation
  INDEX: Number.name, //array drilling
  INVALID: 'INVALID', //an invalid operation
}

const loadGlobal = (globals = {}) => {
  //for browser static import
  if (typeof window !== 'undefined') {
    window.L = {
      ...window.L,
      ...globals,
    }
  }
}

module.exports = {
  getConstructorName,
  OPERATION_TYPES,
  loadGlobal,
}
