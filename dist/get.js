/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, getConstructorName, TYPES, getOperationType } = __webpack_require__(914)

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


/***/ }),

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
/******/ 	var __webpack_exports__ = __webpack_require__(637);
/******/ 	
/******/ })()
;