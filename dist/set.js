/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 914:
/***/ ((module) => {

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


/***/ }),

/***/ 452:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, getConstructorName, TYPES, getOperationType } = __webpack_require__(914)

const getChild = (input, operation, defaultValue, i) => {
  if (input == null) {
    return defaultValue
  }
  if (TYPES.STRING.is(operation) && !TYPES.OBJECT.is(input)) {
    throw new Error(
      `Invalid Set operation at index: ${i}: cannot get key ${operation} from ${getConstructorName(input)}`
    )
  } else if (TYPES.NUMBER.is(operation) && !TYPES.ARRAY.is(input)) {
    throw new Error(
      `Invalid Set operation at index: ${i}: cannot get index ${operation} from ${getConstructorName(input)}`
    )
  } else {
    return input[operation]
  }
}

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
      objectRef = objectRef[operation] =
        i === operations.length - 1
          ? TYPES.FUNCTION.is(value)
            ? value(objectRef[operation])
            : value
          : getChild(objectRef, operation, defaultValue, i)
    })

  return input
}

module.exports = {
  _set,
  set: (input, ...operationInputs) => _set(...operationInputs)(input),
}

//for browser static import
loadGlobal(module.exports)


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(452);
/******/ 	
/******/ })()
;