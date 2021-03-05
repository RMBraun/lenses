/******/ var __webpack_modules__ = ({

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
/******/ var __webpack_exports__ = __webpack_require__(950);
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_export_target__ = exports;
/******/ for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 
