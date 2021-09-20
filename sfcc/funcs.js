/******/ var __webpack_modules__ = ({

/***/ 472:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = __webpack_require__(743),
    loadGlobal = _require.loadGlobal,
    getConstructorName = _require.getConstructorName,
    TYPES = _require.TYPES;

var func = function func(userFunction) {
  if (!TYPES.FUNCTION.is(userFunction)) {
    throw new Error("func must take a function as an input, received ".concat(getConstructorName(userFunction), " instead"));
  }

  return function (input) {
    return input == null ? input : userFunction(input);
  };
};

var log = function log(customInput) {
  var prettify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return function (input) {
    var output = customInput ? "".concat(customInput, " ").concat(input) : input;
    console.log(prettify ? JSON.stringify(output, null, 2) : JSON.stringify(output));
    return input;
  };
}; // prettier-ignore


var forceBool = function forceBool() {
  return function (input) {
    return !!input;
  };
}; // prettier-ignore


var forceInt = function forceInt() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (input) {
    return parseInt.apply(void 0, [input].concat(args));
  };
}; // prettier-ignore


var forceFloat = function forceFloat() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (input) {
    return parseFloat.apply(void 0, [input].concat(args));
  };
}; // prettier-ignore


var forceNum = function forceNum() {
  return function (input) {
    return input == null ? 0 : Number(input).valueOf();
  };
}; // prettier-ignore


var forceString = function forceString() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return function (input) {
    return JSON.stringify.apply(JSON, [input].concat(args));
  };
}; // prettier-ignore


var forceParse = function forceParse() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return function (input) {
    return JSON.parse.apply(JSON, [input].concat(args));
  };
}; // prettier-ignore


var forceType = function forceType(T) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return function (input) {
    return _construct(T, [input].concat(args));
  };
};

module.exports.func = func;
module.exports.log = log;

module.exports.parse = function () {
  return func(forceParse.apply(void 0, arguments));
};

module.exports.stringify = function () {
  return func(forceString.apply(void 0, arguments));
};

module.exports.toBool = function () {
  return func(forceBool.apply(void 0, arguments));
};

module.exports.toNum = function () {
  return func(forceNum.apply(void 0, arguments));
};

module.exports.toInt = function () {
  return func(forceInt.apply(void 0, arguments));
};

module.exports.toFloat = function () {
  return func(forceFloat.apply(void 0, arguments));
};

module.exports.toType = function (T) {
  for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
    args[_key6 - 1] = arguments[_key6];
  }

  return func(forceType.apply(void 0, [T].concat(args)));
};

module.exports.forceBool = forceBool;
module.exports.forceInt = forceInt;
module.exports.forceFloat = forceFloat;
module.exports.forceNum = forceNum;
module.exports.forceString = forceString;
module.exports.forceType = forceType; //for browser static import

loadGlobal(module.exports);

/***/ }),

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
/******/ var __webpack_exports__ = __webpack_require__(472);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
