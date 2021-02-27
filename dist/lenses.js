/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, getConstructorName, TYPES } = __webpack_require__(914)

module.exports.log = (customInput, prettify = true) => (input) => {
  const output = customInput ? `${customInput} ${input}` : input

  console.log(prettify ? JSON.stringify(output, null, 2) : JSON.stringify(output))

  return input
}

module.exports.func = (userFunction) => {
  if (!TYPES.FUNCTION.is(userFunction)) {
    throw new Error(`func must take a function as an input, received ${getConstructorName(userFunction)} instead`)
  }

  return (input) => (input == null ? input : userFunction(input))
}

module.exports.parse = (input) => (input == null ? input : JSON.parse(input))

module.exports.stringify = (input) => (input == null ? input : JSON.stringify(input))

//for browser static import
loadGlobal(module.exports)


/***/ }),

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

module.exports = {
  _get,
  defaults,
  get: (input, ...operationInputs) => _get(...operationInputs)(input),
}

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


/***/ }),

/***/ 281:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal } = __webpack_require__(914)

//add all dependencies
module.exports = {
  ...__webpack_require__(637),
  ...__webpack_require__(452),
  ...__webpack_require__(188),
  ...__webpack_require__(244),
}

//for browser static import
loadGlobal(module.exports)


/***/ }),

/***/ 188:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, TYPES, getConstructorName } = __webpack_require__(914)

const apply = (name) => (...options) => (input) => {
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

//Create common curried version of Array and Object prototypes
//To be used in conjunction with 'get'
module.exports.apply = apply
module.exports.concat = apply('concat')
module.exports.entries = apply('entries')
module.exports.every = apply('every')
module.exports.fill = apply('fill')
module.exports.filter = apply('filter')
module.exports.find = apply('find')
module.exports.findIndex = apply('findIndex')
module.exports.forEach = apply('forEach')
module.exports.includes = apply('includes')
module.exports.indexOf = apply('indexOf')
module.exports.join = apply('join')
module.exports.keys = apply('keys')
module.exports.lastIndexOf = apply('lastIndexOf')
module.exports.map = apply('map')
module.exports.reduce = apply('reduce')
module.exports.reverse = apply('reverse')
module.exports.slice = apply('slice')
module.exports.some = apply('some')
module.exports.sort = apply('sort')
module.exports.splice = apply('splice')
module.exports.values = apply('values')
module.exports.assign = apply('assign')

//for browser static import
loadGlobal(module.exports)


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
/******/ 	var __webpack_exports__ = __webpack_require__(281);
/******/ 	
/******/ })()
;