/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 914:
/***/ ((module) => {

const getConstructorName = input =>
  input == null ? `${input}` : input.constructor ? input.constructor.name : 'Unknown'

const getOperationType = operation =>
  TYPES.STRING.is(operation) && operation.trim().length > 0
    ? TYPES.STRING
    : TYPES.NUMBER.is(operation) && operation >= 0
    ? TYPES.NUMBER
    : TYPES.FUNCTION.is(operation)
    ? TYPES.FUNCTION
    : TYPES.INVALID

const isType = (input, type, typeofName, constructor) =>
  input === type ||
  input instanceof constructor ||
  getConstructorName(input) === constructor.name ||
  typeof input === typeofName

const TYPES = {
  STRING: {
    is: input => isType(input, TYPES.STRING, 'string', String),
    toString: () => 'STRING',
  },
  FUNCTION: {
    is: input => isType(input, TYPES.FUNCTION, 'function', Function),
    toString: () => 'FUNCTION',
  },
  NUMBER: {
    is: input => isType(input, TYPES.NUMBER, 'number', Number),
    toString: () => 'NUMBER',
  },
  OBJECT: {
    is: input => isType(input, TYPES.OBJECT, 'object', Object),
    toString: () => 'OBJECT',
  },
  ARRAY: {
    is: input => input === TYPES.ARRAY || Array.isArray(input),
    toString: () => 'ARRAY',
  },
  //TODO: figure out how to handle this correctly
  HTML_ELEMENT: {
    is: input => isType(input, TYPES.HTML_ELEMENT, 'object', HTMLElement),
    toString: () => 'HTML_ELEMENT',
  },
  INVALID: {
    is: input => input === TYPES.INVALID,
    toString: () => 'INVALID',
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