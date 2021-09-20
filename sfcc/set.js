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

/***/ 17:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(743),
    loadGlobal = _require.loadGlobal,
    getConstructorName = _require.getConstructorName,
    TYPES = _require.TYPES,
    getOperationType = _require.getOperationType;

var getChild = function getChild(input, operation, defaultValue, i) {
  if (TYPES.STRING.is(operation) && !TYPES.OBJECT.is(input)) {
    throw new Error("Invalid Set operation at index: ".concat(i, ": cannot get key ").concat(operation, " from ").concat(getConstructorName(input)));
  } else if (TYPES.NUMBER.is(operation) && !TYPES.ARRAY.is(input)) {
    throw new Error("Invalid Set operation at index: ".concat(i, ": cannot get index ").concat(operation, " from ").concat(getConstructorName(input)));
  } else {
    return Object.prototype.hasOwnProperty.call(input, operation) ? input[operation] : defaultValue;
  }
}; //Curried version


var _set = function _set() {
  for (var _len = arguments.length, operationInputs = new Array(_len), _key = 0; _key < _len; _key++) {
    operationInputs[_key] = arguments[_key];
  }

  return function (input) {
    if (!TYPES.OBJECT.is(input) && !TYPES.ARRAY.is(input) && input != null) {
      throw new Error("Invalid Set input: expecting an Object, Array, null, or undefined but received ".concat(getConstructorName(input)));
    }

    var rawOperations = [].concat(operationInputs);

    if (input == null) {
      input = TYPES.STRING.is(getOperationType(rawOperations[0])) ? {} : [];
    }

    if (rawOperations.length < 2) {
      throw new Error("Invalid Set: expecting a minimum of 3 arguments but received only ".concat(rawOperations.length + 1));
    }

    var value = rawOperations.pop();
    var objectRef = input;
    rawOperations //operation validation
    .map(function (operation, i) {
      var operationType = getOperationType(operation);

      if (!TYPES.STRING.is(operationType) && !TYPES.NUMBER.is(operationType)) {
        throw new Error("Invalid Set operation at index: ".concat(i, ": expecting a String or Number but received ").concat(getConstructorName(operation)));
      }

      var nextOperationType = getOperationType(rawOperations[i + 1]);
      return {
        operation: operation,
        defaultValue: TYPES.STRING.is(nextOperationType) ? {} : []
      };
    }) //operation execution
    .forEach(function (_ref, i, operations) {
      var operation = _ref.operation,
          defaultValue = _ref.defaultValue;

      if (!TYPES.OBJECT.is(objectRef) && !TYPES.ARRAY.is(objectRef) && !TYPES.FUNCTION.is(objectRef)) {
        throw new Error("Invalid set operation at index: ".concat(i, ": cannot set nested value on non-Object, non-Array, and non-Function entities"));
      }

      objectRef = objectRef[operation] = i === operations.length - 1 ? TYPES.FUNCTION.is(value) ? value(objectRef[operation]) : value : getChild(objectRef, operation, defaultValue, i);
    });
    return input;
  };
};

var set = function set(input) {
  for (var _len2 = arguments.length, operationInputs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    operationInputs[_key2 - 1] = arguments[_key2];
  }

  return _set.apply(void 0, operationInputs)(input);
};

module.exports._set = _set;
module.exports.set = set; //for browser static import

loadGlobal(module.exports);

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
/******/ var __webpack_exports__ = __webpack_require__(17);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
