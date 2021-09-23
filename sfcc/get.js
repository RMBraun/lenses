/******/ var __webpack_modules__ = ({

/***/ 399:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(743),
    loadGlobal = _require.loadGlobal,
    getConstructorName = _require.getConstructorName,
    TYPES = _require.TYPES,
    getOperationType = _require.getOperationType;

var getProperty = function getProperty(property, source) {
  if (source == null) {
    return source;
  } //Need to safegued against HTMLElement which does not exist in NodeJs
  //To prevent test failures only


  var hasProperty = typeof HTMLElement !== 'undefined' && TYPES.HTML_ELEMENT.is(source) ? HTMLElement.prototype.hasAttribute.call(source, property) : Object.prototype.hasOwnProperty.call(source, property);
  return hasProperty ? source[property] : undefined;
};

var applyFunction = function applyFunction(func, source, i) {
  if (!TYPES.FUNCTION.is(func)) {
    throw new Error("At index ".concat(i, ": cannot apply function since it is not a Function"));
  }

  return func(source);
};

var performOperation = function performOperation(_ref, source, i) {
  var operation = _ref.operation,
      type = _ref.type;
  return source == null ? !TYPES.FUNCTION.is(type) ? source : applyFunction(operation, source, i) : TYPES.STRING.is(type) || TYPES.NUMBER.is(type) ? getProperty(operation, source) : TYPES.FUNCTION.is(type) ? applyFunction(operation, source, i) : source;
}; //Curried version
// prettier-ignore


var _get = function _get() {
  for (var _len = arguments.length, operationInputs = new Array(_len), _key = 0; _key < _len; _key++) {
    operationInputs[_key] = arguments[_key];
  }

  return function (input) {
    //default return
    if (operationInputs.length === 0) {
      return input;
    }

    var operations = [].concat(operationInputs);
    return operations //operation validation
    .map(function (operation, i) {
      var type = getOperationType(operation);

      if (TYPES.INVALID.is(type)) {
        throw new Error("Invalid Get operation at index ".concat(i, ": expecting String, Number, or Function but received ").concat(getConstructorName(operation)));
      }

      return {
        operation: operation,
        type: type
      };
    }) //operation execution
    .reduce(function (acc, operationInfo, i) {
      return performOperation(operationInfo, acc, i);
    }, input);
  };
};

var defaults = function defaults(defaultValue) {
  return function (input) {
    return input == null ? defaultValue : input;
  };
};

var get = function get(input) {
  for (var _len2 = arguments.length, operationInputs = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    operationInputs[_key2 - 1] = arguments[_key2];
  }

  return _get.apply(void 0, operationInputs)(input);
};

module.exports._get = _get;
module.exports.defaults = defaults;
module.exports.get = get; //for browser static import

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
  return input === type || input instanceof constructor || getConstructorName(input) === constructor.name || _typeof(input) === typeofName;
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
  HTML_ELEMENT: {
    is: function is(input) {
      return isType(input, TYPES.HTML_ELEMENT, 'object', HTMLElement);
    },
    toString: function toString() {
      return 'HTML_ELEMENT';
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
/******/ var __webpack_exports__ = __webpack_require__(399);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
