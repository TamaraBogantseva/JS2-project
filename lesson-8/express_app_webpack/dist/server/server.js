/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/***/ ((module) => {

eval("var add = function add(cart, req) {\n  cart.contents.push(req.body);\n  return {\n    newCart: JSON.stringify(cart, null, 4),\n    name: req.body.product_name\n  };\n};\n\nvar change = function change(cart, req) {\n  var find = cart.contents.find(function (el) {\n    return el.id_product === +req.params.id;\n  });\n  find.quantity += req.body.quantity;\n  return {\n    newCart: JSON.stringify(cart, null, 4),\n    name: find.product_name\n  };\n};\n\nvar remove = function remove(cart, req) {\n  var find = cart.contents.find(function (el) {\n    return el.id_product === +req.params.id;\n  });\n  cart.contents.splice(cart.contents.indexOf(find), 1);\n  return {\n    newCart: JSON.stringify(cart, null, 4),\n    name: find.product_name\n  };\n};\n\nmodule.exports = {\n  add: add,\n  change: change,\n  remove: remove\n};\n\n//# sourceURL=webpack://express_app/./src/server/cart.js?");

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar router = express.Router();\nrouter.get('/', function (req, res) {\n  fs.readFile('dist/server/db/userCart.json', function (err, data) {\n    if (err) {\n      console.log(err);\n      res.send({\n        result: 0,\n        text: err\n      });\n      return;\n    }\n\n    res.send(data);\n  });\n});\nrouter.post('/', function (req, res) {\n  handler(req, res, 'add', 'dist/server/db/userCart.json');\n});\nrouter.put('/:id', function (req, res) {\n  handler(req, res, 'change', 'dist/server/db/userCart.json');\n});\nrouter[\"delete\"]('/:id', function (req, res) {\n  handler(req, res, 'remove', 'dist/server/db/userCart.json');\n});\nmodule.exports = router;\n\n//# sourceURL=webpack://express_app/./src/server/cartRouter.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar logger = __webpack_require__(/*! ./logger */ \"./src/server/logger.js\");\n\nvar handler = function handler(req, res, action, file) {\n  fs.readFile(file, function (err, data) {\n    if (err) {\n      console.log(err);\n      res.send({\n        result: 0,\n        text: err\n      });\n      return;\n    }\n\n    var _cart$action = cart[action](JSON.parse(data), req),\n        newCart = _cart$action.newCart,\n        name = _cart$action.name;\n\n    fs.writeFile(file, newCart, function (err) {\n      if (err) {\n        console.log(err);\n        res.send({\n          result: 0,\n          text: err\n        });\n        return;\n      }\n\n      logger(name, action);\n      res.send({\n        result: 1\n      });\n    });\n  });\n};\n\nmodule.exports = handler;\n\n//# sourceURL=webpack://express_app/./src/server/handler.js?");

/***/ }),

/***/ "./src/server/logger.js":
/*!******************************!*\
  !*** ./src/server/logger.js ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var moment = __webpack_require__(/*! moment */ \"moment\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar logger = function logger(name, action) {\n  fs.readFile('dist/server/db/stats.json', 'utf-8', function (err, data) {\n    if (err) {\n      console.log(err);\n      return;\n    }\n\n    var stat = JSON.parse(data);\n    stat.push({\n      time: moment().format('MMMM Do YYYY, h:mm:ss a'),\n      prod_name: name,\n      action: action\n    });\n    fs.writeFile('dist/server/db/stats.json', JSON.stringify(stat, null, 4), function (err) {\n      if (err) {\n        console.log(err);\n      }\n    });\n  });\n};\n\nmodule.exports = logger;\n\n//# sourceURL=webpack://express_app/./src/server/logger.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");;

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("moment");;

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
(() => {
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
eval("var express = __webpack_require__(/*! express */ \"express\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar cart = __webpack_require__(/*! ./cartRouter */ \"./src/server/cartRouter.js\");\n\nvar app = express();\napp.use(express.json());\napp.use('/', express[\"static\"]('dist/public'));\napp.use('/api/cart', cart);\napp.get('/api/products', function (req, res) {\n  fs.readFile('dist/server/db/products.json', function (err, data) {\n    if (err) {\n      console.log(err);\n      res.send({\n        result: 0,\n        text: err\n      });\n      return;\n    }\n\n    res.send(data);\n  });\n});\napp.listen(3000, function () {\n  return console.log('Server started...');\n});\n\n//# sourceURL=webpack://express_app/./src/server/server.js?");
})();

/******/ })()
;