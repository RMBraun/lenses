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

/***/ 188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, TYPES, getConstructorName } = __webpack_require__(914)

const _call = (name) => (...options) => (input) => {
  if (name == null || name.trim() == null) {
    throw new Error('no prototype function name specified')
  }

  if (input == null) {
    return input
  }

  if (!TYPES.FUNCTION.is(input[name])) {
    throw new Error(`The function ${name} does not exist for type ${getConstructorName(input)}`)
  }

  return input[name](...options)
}

//Create common curried version of Array, Object, and String prototypes
//To be used in conjunction with 'get'
module.exports.call = (name, ...options) => (input) => _call(name)(...options)(input)
module.exports._call = _call
module.exports.concat = _call('concat')
module.exports.entries = _call('entries')
module.exports.every = _call('every')
module.exports.fill = _call('fill')
module.exports.filter = _call('filter')
module.exports.find = _call('find')
module.exports.findIndex = _call('findIndex')
module.exports.forEach = _call('forEach')
module.exports.includes = _call('includes')
module.exports.indexOf = _call('indexOf')
module.exports.join = _call('join')
module.exports.keys = _call('keys')
module.exports.lastIndexOf = _call('lastIndexOf')
module.exports.map = _call('map')
module.exports.push = _call('push')
module.exports.reduce = _call('reduce')
module.exports.reverse = _call('reverse')
module.exports.slice = _call('slice')
module.exports.some = _call('some')
module.exports.sort = _call('sort')
module.exports.splice = _call('splice')
module.exports.values = _call('values')
module.exports.assign = _call('assign')
module.exports.trim = _call('trim')
module.exports.toLowerCase = _call('toLowerCase')
module.exports.toUpperCase = _call('toUpperCase')
module.exports.is = (b) => (a) => a === b || Object.is(a, b)
module.exports.replace = _call('replace')
module.exports.replaceAll = _call('replaceAll')
module.exports.padEnd = _call('padEnd')
module.exports.padStart = _call('padStart')
module.exports.repeat = _call('repeat')
module.exports.charAt = _call('charAt')
module.exports.charCodeAt = _call('charCodeAt')
module.exports.endsWith = _call('endsWith')
module.exports.startsWith = _call('startsWith')
module.exports.match = _call('match')
module.exports.matchAll = _call('matchAll')
module.exports.normalize = _call('normalize')
module.exports.split = _call('split')
module.exports.substring = _call('substring')
module.exports.toLowerCase = _call('toLowerCase')
module.exports.toUpperCase = _call('toUpperCase')
module.exports.trim = _call('trim')
module.exports.trimStart = _call('trimStart')
module.exports.trimEnd = _call('trimEnd')

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
/******/ 	var __webpack_exports__ = __webpack_require__(188);
/******/ 	
/******/ })()
;