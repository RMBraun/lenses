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
};

var forceBool = function forceBool() {
  return function (input) {
    return !!input;
  };
};

var forceInt = function forceInt() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (input) {
    return parseInt.apply(void 0, [input].concat(args));
  };
};

var forceFloat = function forceFloat() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (input) {
    return parseFloat.apply(void 0, [input].concat(args));
  };
};

var forceNum = function forceNum() {
  return function (input) {
    return input == null ? 0 : Number(input).valueOf();
  };
};

var forceString = function forceString() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  return function (input) {
    return JSON.stringify.apply(JSON, [input].concat(args));
  };
};

var forceParse = function forceParse() {
  for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    args[_key4] = arguments[_key4];
  }

  return function (input) {
    return JSON.parse.apply(JSON, [input].concat(args));
  };
};

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

module.exports.toBool = func(forceBool);
module.exports.toNum = func(forceNum);

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
  }

  return Object.prototype.hasOwnProperty.call(source, property) ? source[property] : undefined;
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
  return input === type || _typeof(input) === typeofName || input instanceof constructor || getConstructorName(input) === constructor.name;
};

var TYPES = {
  STRING: {
    is: function is(input) {
      return isType(input, TYPES.STRING, 'string', String);
    }
  },
  FUNCTION: {
    is: function is(input) {
      return isType(input, TYPES.FUNCTION, 'function', Function);
    }
  },
  NUMBER: {
    is: function is(input) {
      return isType(input, TYPES.NUMBER, 'number', Number);
    }
  },
  OBJECT: {
    is: function is(input) {
      return isType(input, TYPES.OBJECT, 'object', Object);
    }
  },
  ARRAY: {
    is: function is(input) {
      return input === TYPES.ARRAY || Array.isArray(input);
    }
  },
  INVALID: {
    is: function is(input) {
      return input === TYPES.INVALID;
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

/***/ 882:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = __webpack_require__(743),
    loadGlobal = _require.loadGlobal; //add all dependencies


module.exports = _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, __webpack_require__(399)), __webpack_require__(17)), __webpack_require__(129)), __webpack_require__(472)); //for browser static import

loadGlobal(module.exports);

/***/ }),

/***/ 950:
/***/ (function(module) {

module.exports.find = function (callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      if (callback.call(thisRef, input[i], i, input)) {
        return input[i];
      }
    }
  };
};

module.exports.map = function (callback, thisRef) {
  return function (input) {
    var output = [];

    for (var i = 0; i < input.length; i++) {
      output.push(callback.call(thisRef, input[i], i, input));
    }

    return output;
  };
};

module.exports.forEach = function (callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      callback.call(thisRef, input[i], i, input);
    }
  };
};

module.exports.every = function (callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      if (!callback.call(thisRef, input[i], i, input)) {
        return false;
      }
    }

    return true;
  };
};

module.exports.some = function (callback, thisRef) {
  return function (input) {
    for (var i = 0; i < input.length; i++) {
      if (callback.call(thisRef, input[i], i, input)) {
        return true;
      }
    }

    return false;
  };
};

module.exports.getIndex = function (index) {
  return function (input) {
    return input[index];
  };
};

/***/ }),

/***/ 798:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var _require = __webpack_require__(743),
    loadGlobal = _require.loadGlobal,
    TYPES = _require.TYPES,
    getConstructorName = _require.getConstructorName;

var _call = function _call(name) {
  return function () {
    for (var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++) {
      options[_key] = arguments[_key];
    }

    return function (input) {
      if (name == null || name.trim() == null) {
        throw new Error('no prototype function name specified');
      }

      if (input == null) {
        return input;
      }

      if (!TYPES.FUNCTION.is(input[name])) {
        throw new Error("The function ".concat(name, " does not exist for type ").concat(getConstructorName(input)));
      }

      return input[name].apply(input, options);
    };
  };
};

var isEmpty = function isEmpty(input) {
  if (input == null) {
    return true;
  } else if (TYPES.STRING.is(input)) {
    return !input || input == '' || input.length === 0;
  } else if (TYPES.ARRAY.is(input)) {
    return input.length === 0;
  } else if (TYPES.OBJECT.is(input)) {
    return Object.keys(input).length === 0;
  } else {
    return false;
  }
}; //Create common curried version of Array, Object, and String prototypes
//To be used in conjunction with 'get'


module.exports.call = function (name) {
  for (var _len2 = arguments.length, options = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    options[_key2 - 1] = arguments[_key2];
  }

  return function (input) {
    return _call(name).apply(void 0, options)(input);
  };
};

module.exports._call = _call;
module.exports.concat = _call('concat');

module.exports.entries = function () {
  return function (input) {
    return input == null ? input : Object.entries(input);
  };
};

module.exports.every = _call('every');
module.exports.fill = _call('fill');
module.exports.filter = _call('filter');
module.exports.find = _call('find');
module.exports.findIndex = _call('findIndex');
module.exports.forEach = _call('forEach');
module.exports.includes = _call('includes');
module.exports.indexOf = _call('indexOf');
module.exports.join = _call('join');

module.exports.keys = function () {
  return function (input) {
    if (input == null) {
      return input;
    }

    if (TYPES.OBJECT.is(input)) {
      return Object.keys(input);
    } else if (TYPES.ARRAY.is(input)) {
      return Array.keys(input);
    } else {
      throw new Error("Input must be of type Object or Array but found ".concat(getConstructorName(input)));
    }
  };
};

module.exports.lastIndexOf = _call('lastIndexOf');
module.exports.map = _call('map');
module.exports.push = _call('push');
module.exports.reduce = _call('reduce');
module.exports.reverse = _call('reverse');
module.exports.slice = _call('slice');
module.exports.some = _call('some');
module.exports.sort = _call('sort');
module.exports.splice = _call('splice');

module.exports.values = function () {
  return function (input) {
    if (input == null) {
      return input;
    }

    if (TYPES.OBJECT.is(input)) {
      return Object.values(input);
    } else if (TYPES.ARRAY.is(input)) {
      return Array.values(input);
    } else {
      throw new Error("Input must be of type Object or Array but found ".concat(getConstructorName(input)));
    }
  };
};

module.exports.assign = function () {
  for (var _len3 = arguments.length, options = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    options[_key3] = arguments[_key3];
  }

  return function (input) {
    return input == null ? input : Object.assign.apply(Object, [input].concat(options));
  };
};

module.exports.hasOwnProperty = function (name) {
  return function (input) {
    return input == null ? input : Object.prototype.hasOwnProperty.call(input, name);
  };
};

module.exports.trim = _call('trim');
module.exports.toLowerCase = _call('toLowerCase');
module.exports.toUpperCase = _call('toUpperCase');

module.exports.is = function (b) {
  return function (a) {
    return a === b || Object.is(a, b);
  };
};

module.exports.replace = _call('replace');
module.exports.replaceAll = _call('replaceAll');
module.exports.padEnd = _call('padEnd');
module.exports.padStart = _call('padStart');
module.exports.repeat = _call('repeat');
module.exports.charAt = _call('charAt');
module.exports.charCodeAt = _call('charCodeAt');
module.exports.endsWith = _call('endsWith');
module.exports.startsWith = _call('startsWith');
module.exports.match = _call('match');
module.exports.matchAll = _call('matchAll');
module.exports.normalize = _call('normalize');
module.exports.split = _call('split');
module.exports.substring = _call('substring');
module.exports.toLowerCase = _call('toLowerCase');
module.exports.toUpperCase = _call('toUpperCase');
module.exports.trim = _call('trim');
module.exports.trimStart = _call('trimStart');
module.exports.trimEnd = _call('trimEnd');

module.exports.isArray = function (input) {
  return input == null ? input : Array.isArray(input);
};

module.exports.isEmpty = function () {
  return function (input) {
    return isEmpty(input);
  };
};

module.exports.isNotEmpty = function () {
  return function (input) {
    return !isEmpty(input);
  };
}; //for browser static import


loadGlobal(module.exports);

/***/ }),

/***/ 129:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * SFCC has implemented Java Collection classes
 * Many native ES5 Array functions do not exist
 * This will add support
 */
var _require = __webpack_require__(743),
    loadGlobal = _require.loadGlobal,
    TYPES = _require.TYPES,
    getConstructorName = _require.getConstructorName;

var protos = __webpack_require__(798);

var polyfills = __webpack_require__(950);

var getIterator = function getIterator(input) {
  return input instanceof dw.util.Iterator ? input : input.iterator();
};

var Collection = {
  toArray: function toArray(input) {
    var output = [];
    var iterator = getIterator(input);

    while (iterator.hasNext()) {
      output.push(iterator.next());
    }

    return output;
  },
  find: function find(callback, thisRef) {
    return function (input) {
      var iterator = getIterator(input);
      var item;

      while (iterator.hasNext()) {
        item = iterator.next();

        if (callback.call(thisRef, item, i, input)) {
          return item;
        }
      }
    };
  },
  map: function map(callback, thisRef) {
    return function (input) {
      var iterator = getIterator(input);
      var index = 0;
      var result = [];

      while (iterator.hasNext()) {
        result.push(callback.call(thisRef, iterator.next(), index, input));
        index++;
      }

      return result;
    };
  },
  filter: function filter(callback, thisRef) {
    return function (input) {
      var iterator = getIterator(input);
      var index = 0;
      var result = [];

      while (iterator.hasNext()) {
        var nextValue = iterator.next();

        if (callback.call(thisRef, nextValue, index, input)) {
          result.push(nextValue);
        }

        index++;
      }

      return result;
    };
  },
  forEach: function forEach(callback, thisRef) {
    return function (input) {
      var iterator = getIterator(input);
      var index = 0;

      while (iterator.hasNext()) {
        callback.call(thisRef, iterator.next(), index, input);
        index++;
      }
    };
  },
  concat: function concat() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (input) {
      var output = Collection.toArray(input);

      for (var i = 0; i < args.length; i++) {
        if (TYPES.ARRAY.is(args[i])) {
          output.push.apply(output, _toConsumableArray(args[i]));
        } else if (args[i] instanceof dw.util.Collection) {
          output.push.apply(output, _toConsumableArray(Collection.toArray(args[i])));
        } else {
          output.push(args[i]);
        }
      }
    };
  },
  every: function every(callback, thisRef) {
    return function (input) {
      var iterator = getIterator(input);
      var index = 0;

      while (iterator.hasNext()) {
        if (!callback.call(thisRef, iterator.next(), index, input)) {
          return false;
        }

        index++;
      }

      return true;
    };
  },
  some: function some(callback, thisRef) {
    return function (input) {
      var iterator = getIterator(input);
      var index = 0;

      while (iterator.hasNext()) {
        if (callback.call(thisRef, iterator.next(), index, input)) {
          return true;
        }

        index++;
      }

      return false;
    };
  },
  getIndex: function getIndex(index) {
    return function (input) {
      var iterator = getIterator(input);
      var i = 0;

      while (iterator.hasNext()) {
        if (i === index) {
          return iterator.next();
        }

        iterator.next();
        index++;
      }
    };
  },
  reduce: function reduce(callback, initVal) {
    return function (input) {
      var iterator = getIterator(input);
      var index = 0;
      var acc = initVal === undefined ? iterator.next() : initVal;

      while (iterator.hasNext()) {
        acc = callback(acc, iterator.next(), index, input);
        index++;
      }

      return acc;
    };
  }
};

var hasNativeFunction = function hasNativeFunction(input, name) {
  try {
    return Object.prototype.hasOwnProperty.call(input, name) || TYPES.FUNCTION.is(input[name]);
  } catch (e) {
    return false;
  }
};

var callbackWrapper = function callbackWrapper(name, type) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return function (input) {
      if (input == null) {
        return input;
      }

      if (hasNativeFunction(input, name)) {
        return protos.call.apply(protos, [name].concat(args))(input);
      } else if (type.is(input) && polyfills[name]) {
        return polyfills[name].apply(polyfills, args)(input);
      } else if (input instanceof dw.util.Collection || input instanceof dw.util.Iterator) {
        return Collection[name].apply(Collection, args)(input);
      } else {
        throw new Error("The function ".concat(name, " does not exist for type ").concat(getConstructorName(input)));
      }
    };
  };
};

var isEmpty = function isEmpty(input) {
  if (input == null) {
    return true;
  } else if (TYPES.STRING.is(input)) {
    return !input || input == '' || input.length === 0;
  } else if (TYPES.ARRAY.is(input)) {
    return input.length === 0;
  } else if (input instanceof dw.util.Collection) {
    return input.isEmpty();
  } else if (input instanceof dw.util.Iterator) {
    return input.hasNext();
  } else if (TYPES.OBJECT.is(input)) {
    return Object.keys(input).length === 0;
  } else {
    return false;
  }
}; //Create common curried version of Array and Object prototypes
//To be used in conjunction with 'get'


module.exports = protos; //Special ES5 support

module.exports.toArray = function () {
  return function (input) {
    if (input == null) {
      return input;
    }

    if (TYPES.ARRAY.is(input)) {
      return input;
    } else if (input instanceof dw.util.Collection || input instanceof dw.util.Iterator) {
      return Collection.toArray(input);
    } else {
      throw new Error("Cannot convert input of type ".concat(getConstructorName(input), " into Array"));
    }
  };
}; //Collection, Iterable, and pollyfill support


module.exports.filter = callbackWrapper('filter', TYPES.ARRAY);
module.exports.find = callbackWrapper('find', TYPES.ARRAY);
module.exports.map = callbackWrapper('map', TYPES.ARRAY);
module.exports.forEach = callbackWrapper('forEach', TYPES.ARRAY);
module.exports.concat = callbackWrapper('concat', TYPES.ARRAY);
module.exports.every = callbackWrapper('every', TYPES.ARRAY);
module.exports.some = callbackWrapper('some', TYPES.ARRAY);
module.exports.getIndex = callbackWrapper('getIndex', TYPES.ARRAY);
module.exports.reduce = callbackWrapper('reduce', TYPES.ARRAY); //Java class specific prototypes

module.exports.contains = protos._call('contains');
module.exports.containsAll = protos._call('containsAll');
module.exports.add = protos._call('add');
module.exports.addAll = protos._call('addAll');
module.exports.clear = protos._call('clear');
module.exports.remove = protos._call('remove');
module.exports.removeAll = protos._call('removeAll'); //custom functions

module.exports.isEmpty = function () {
  return function (input) {
    return isEmpty(input);
  };
};

module.exports.isNotEmpty = function () {
  return function (input) {
    return !isEmpty(input);
  };
};

module.exports.getProp = function (key) {
  return function (input) {
    return input != null ? Object.hasOwnProperty.call(input, key) ? input[key] : undefined : input;
  };
}; //for browser static import


loadGlobal(module.exports);

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
/******/ var __webpack_exports__ = __webpack_require__(882);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
