/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 244:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, getConstructorName, TYPES } = __webpack_require__(914)

const func = (userFunction) => {
  if (!TYPES.FUNCTION.is(userFunction)) {
    throw new Error(`func must take a function as an input, received ${getConstructorName(userFunction)} instead`)
  }
  return (input) => (input == null ? input : userFunction(input))
}

const log = (customInput, prettify = true) => (input) => {
  const output = customInput ? `${customInput} ${input}` : input
  console.log(prettify ? JSON.stringify(output, null, 2) : JSON.stringify(output))
  return input
}

const forceBool = () => (input) => !!input
const forceInt = (...args) => (input) => parseInt(input, ...args)
const forceFloat = (...args) => (input) => parseFloat(input, ...args)
const forceNum = () => (input) => (input == null ? 0 : Number(input).valueOf())
const forceString = (...args) => (input) => JSON.stringify(input, ...args)
const forceParse = (...args) => (input) => JSON.parse(input, ...args)
const forceType = (T, ...args) => (input) => new T(input, ...args)

module.exports.func = func
module.exports.log = log
module.exports.parse = (...args) => func(forceParse(...args))
module.exports.stringify = (...args) => func(forceString(...args))

module.exports.toBool = func(forceBool)
module.exports.toNum = func(forceNum)
module.exports.toInt = (...args) => func(forceInt(...args))
module.exports.toFloat = (...args) => func(forceFloat(...args))
module.exports.toType = (T, ...args) => func(forceType(T, ...args))

module.exports.forceBool = forceBool
module.exports.forceInt = forceInt
module.exports.forceFloat = forceFloat
module.exports.forceNum = forceNum
module.exports.forceString = forceString
module.exports.forceType = forceType

//for browser static import
loadGlobal(module.exports)


/***/ }),

/***/ 637:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const { loadGlobal, getConstructorName, TYPES, getOperationType } = __webpack_require__(914)

const getProperty = (property, source) => {
  if (source == null) {
    return source
  }

  return Object.prototype.hasOwnProperty.call(source, property)
    ? source[property]
    : undefined
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
    : TYPES.STRING.is(type) || TYPES.NUMBER.is(type)
    ? getProperty(operation, source)
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

const isEmpty = (input) => {
  if (input == null) {
    return true
  } else if (TYPES.STRING.is(input)) {
    return !input || input == '' || input.length === 0
  } else if (TYPES.ARRAY.is(input)) {
    return input.length === 0
  } else if (TYPES.OBJECT.is(input)) {
    return Object.keys(input).length === 0
  } else {
    return false
  }
}

//Create common curried version of Array, Object, and String prototypes
//To be used in conjunction with 'get'
module.exports.call = (name, ...options) => (input) => _call(name)(...options)(input)
module.exports._call = _call
module.exports.concat = _call('concat')
module.exports.entries = () => (input) => (input == null ? input : Object.entries(input))
module.exports.every = _call('every')
module.exports.fill = _call('fill')
module.exports.filter = _call('filter')
module.exports.find = _call('find')
module.exports.findIndex = _call('findIndex')
module.exports.forEach = _call('forEach')
module.exports.includes = _call('includes')
module.exports.indexOf = _call('indexOf')
module.exports.join = _call('join')
module.exports.keys = () => input => {
  if (input == null) {
    return input
  }

  if (TYPES.OBJECT.is(input)) {
    return Object.keys(input)
  } else if (TYPES.ARRAY.is(input)) {
    return Array.keys(input)
  } else {
    throw new Error(`Input must be of type Object or Array but found ${getConstructorName(input)}`)
  }
}
module.exports.lastIndexOf = _call('lastIndexOf')
module.exports.map = _call('map')
module.exports.push = _call('push')
module.exports.reduce = _call('reduce')
module.exports.reverse = _call('reverse')
module.exports.slice = _call('slice')
module.exports.some = _call('some')
module.exports.sort = _call('sort')
module.exports.splice = _call('splice')
module.exports.values = () => input => {
  if (input == null) {
    return input
  }

  if (TYPES.OBJECT.is(input)) {
    return Object.values(input)
  } else if (TYPES.ARRAY.is(input)) {
    return Array.values(input)
  } else {
    throw new Error(`Input must be of type Object or Array but found ${getConstructorName(input)}`)
  }
}
module.exports.assign = (...options) => input => input == null ? input : Object.assign(input, ...options)
module.exports.hasOwnProperty = (name) => input => input == null ? input : Object.prototype.hasOwnProperty.call(input, name)
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
module.exports.isArray = input => input == null ? input : Array.isArray(input)

module.exports.isEmpty = () => (input) => isEmpty(input)
module.exports.isNotEmpty = () => (input) => !isEmpty(input)

//for browser static import
loadGlobal(module.exports)


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
const _set = (...operationInputs) => (input) => {
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
/******/ 	var __webpack_exports__ = __webpack_require__(281);
/******/ 	
/******/ })()
;