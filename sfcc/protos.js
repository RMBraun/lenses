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
/******/ var __webpack_exports__ = __webpack_require__(129);
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
