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
/******/ 	var __webpack_exports__ = __webpack_require__(914);
/******/ 	
/******/ })()
;