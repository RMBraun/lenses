/******/ var __webpack_modules__ = ({

/***/ 743:
/***/ (function(module) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getConstructorName = function getConstructorName(input) {
  return input == null ? "".concat(input) : input.constructor ? input.constructor.name : 'Unknown';
};

var getOperationType = function getOperationType(operation) {
  return TYPES.STRING.is(operation) && operation.trim().length > 0 ? TYPES.STRING : TYPES.NUMBER.is(operation) && operation >= 0 ? TYPES.NUMBER : TYPES.FUNCTION.is(operation) ? TYPES.FUNCTION : TYPES.INVALID;
};

var isType = function isType(input, type, typeofName, constructor) {
  return input === type || _typeof(input) === typeofName || input instanceof constructor || getConstructorName(input) === constructor.name;
};

var TYPES = {
  STRING: {
    is: function is(input) {
      return isType(input, TYPES.STRING, 'string', String);
    },
    toString: function toString() {
      return 'STRING';
    }
  },
  FUNCTION: {
    is: function is(input) {
      return isType(input, TYPES.FUNCTION, 'function', Function);
    },
    toString: function toString() {
      return 'FUNCTION';
    }
  },
  NUMBER: {
    is: function is(input) {
      return isType(input, TYPES.NUMBER, 'number', Number);
    },
    toString: function toString() {
      return 'NUMBER';
    }
  },
  OBJECT: {
    is: function is(input) {
      return isType(input, TYPES.OBJECT, 'object', Object);
    },
    toString: function toString() {
      return 'OBJECT';
    }
  },
  ARRAY: {
    is: function is(input) {
      return input === TYPES.ARRAY || Array.isArray(input);
    },
    toString: function toString() {
      return 'ARRAY';
    }
  },
  INVALID: {
    is: function is(input) {
      return input === TYPES.INVALID;
    },
    toString: function toString() {
      return 'INVALID';
    }
  }
}; //for browser static import

var loadGlobal = function loadGlobal() {
  var globals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof window !== 'undefined') {
    window.L = _objectSpread(_objectSpread({}, window.L), globals);
  }
};

module.exports = {
  getConstructorName: getConstructorName,
  getOperationType: getOperationType,
  TYPES: TYPES,
  loadGlobal: loadGlobal
};

/***/ }),

/***/ 921:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(743),
    TYPES = _require.TYPES;

var find = function find(callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      if (callback.call(thisRef, input[i], i, input)) {
        return input[i];
      }
    }
  };
};

var map = function map(callback, thisRef) {
  return function (input) {
    var output = [];

    for (var i = 0; i < input.length; i++) {
      output.push(callback.call(thisRef, input[i], i, input));
    }

    return output;
  };
};

var forEach = function forEach(callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      callback.call(thisRef, input[i], i, input);
    }
  };
};

var every = function every(callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      if (!callback.call(thisRef, input[i], i, input)) {
        return false;
      }
    }

    return true;
  };
};

var some = function some(callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      if (callback.call(thisRef, input[i], i, input)) {
        return true;
      }
    }

    return false;
  };
};

var getIndex = function getIndex(index) {
  return function (input) {
    return input[index];
  };
};

module.exports[TYPES.ARRAY.toString()] = {
  find: find,
  map: map,
  forEach: forEach,
  every: every,
  some: some,
  getIndex: getIndex
};

var values = function values() {
  return function (input) {
    var keys = Object.keys(input);
    return keys.map(function (key) {
      return input[key];
    });
  };
};

var entries = function entries() {
  return function (input) {
    var keys = Object.keys(input);
    return keys.map(function (key) {
      return [key, input[key]];
    });
  };
};

module.exports[TYPES.OBJECT.toString()] = [values, entries];

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	if(__webpack_module_cache__[moduleId]) {
/******/ 		return __webpack_module_cache__[moduleId].exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ var __webpack_exports__ = __webpack_require__(921);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
