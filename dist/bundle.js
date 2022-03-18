/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Balls.ts":
/*!**********************!*\
  !*** ./src/Balls.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n\nvar Balls = /** @class */ (function () {\n    function Balls(tid) {\n        this.colsnum = 9;\n        this.rowsnum = 9;\n        this.isSelected = false;\n        this.tableDOM = document.getElementById(tid);\n        this.createEmpty();\n        this.listeners();\n        this.render();\n    }\n    Balls.prototype.createEmpty = function () {\n        this.board = [];\n        this.cells = [];\n        for (var i = 0; i < this.rowsnum; i++) {\n            this.board.push(new Array(this.colsnum - 1));\n            this.cells.push(new Array(this.colsnum - 1));\n            var row = document.createElement(\"tr\");\n            row.id = \"r\" + i;\n            for (var j = 0; j < this.colsnum; j++) {\n                this.board[i][j] = 0;\n                var cell = document.createElement(\"td\");\n                cell.id = i + \"c\" + j;\n                this.cells[i][j] = cell;\n                row.appendChild(cell);\n            }\n            this.tableDOM.appendChild(row);\n        }\n    };\n    Balls.prototype.render = function () {\n        // this.board[5][5] = 3;\n        console.table(this.board);\n        for (var i = 0; i < this.rowsnum; i++) {\n            for (var j = 0; j < this.colsnum; j++) {\n                this.cells[i][j].className =\n                    \"cell \" + _consts__WEBPACK_IMPORTED_MODULE_0__.colorsArr[this.board[i][j]];\n            }\n        }\n    };\n    Balls.prototype.clear = function () {\n        for (var i = 0; i < this.rowsnum; i++) {\n            for (var j = 0; j < this.colsnum; j++) {\n                this.board[i][j] = 0;\n            }\n        }\n    };\n    Balls.prototype.isFull = function () {\n        for (var i = 0; i < this.rowsnum; i++) {\n            for (var j = 0; j < this.colsnum; j++) {\n                if (this.board[i][j] == 0)\n                    return false;\n            }\n        }\n        return true;\n    };\n    Balls.prototype.generateRandomBalls = function (num) {\n        for (var i = 0; i < num; i++) {\n            if (this.isFull())\n                return;\n            this.board.forEach(function (row) {\n                if (!row.includes(0))\n                    return;\n            });\n            var color = Math.floor(Math.random() * (_consts__WEBPACK_IMPORTED_MODULE_0__.colorsArr.length - 1)) + 1;\n            var y = Math.floor(Math.random() * this.rowsnum);\n            var x = Math.floor(Math.random() * this.colsnum);\n            while (this.board[y][x] != 0) {\n                y = Math.floor(Math.random() * this.rowsnum);\n                x = Math.floor(Math.random() * this.colsnum);\n            }\n            console.log(\"color, y, x:\", color, y, x);\n            this.board[y][x] = color;\n        }\n    };\n    Balls.prototype.listeners = function () {\n        var _this = this;\n        document.getElementById(\"generate\").addEventListener(\"click\", function () {\n            _this.generateRandomBalls(3);\n            _this.render();\n        });\n        document.getElementById(\"clear\").addEventListener(\"click\", function () {\n            _this.clear();\n            _this.render();\n        });\n        for (var i = 0; i < this.rowsnum; i++) {\n            var _loop_1 = function (j) {\n                var cell = this_1.cells[i][j];\n                cell.addEventListener(\"click\", function (e) {\n                    if (_this.isSelected) {\n                        _this.selectedCell.classList.remove(\"selected\");\n                        if (_this.selectedCell == cell) {\n                            _this.isSelected = false;\n                            _this.selectedCell = null;\n                        }\n                        else {\n                            cell.classList.add(\"selected\");\n                            _this.selectedCell = cell;\n                        }\n                    }\n                    else {\n                        _this.isSelected = true;\n                        _this.selectedCell = cell;\n                        cell.classList.add(\"selected\");\n                    }\n                });\n            };\n            var this_1 = this;\n            for (var j = 0; j < this.colsnum; j++) {\n                _loop_1(j);\n            }\n        }\n    };\n    return Balls;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Balls);\n\n\n//# sourceURL=webpack://balls/./src/Balls.ts?");

/***/ }),

/***/ "./src/consts.ts":
/*!***********************!*\
  !*** ./src/consts.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"balls\": () => (/* binding */ balls),\n/* harmony export */   \"colorsArr\": () => (/* binding */ colorsArr)\n/* harmony export */ });\nvar balls;\n(function (balls) {\n    balls[balls[\"none\"] = 0] = \"none\";\n    balls[balls[\"white\"] = 1] = \"white\";\n    balls[balls[\"gray\"] = 2] = \"gray\";\n    balls[balls[\"red\"] = 3] = \"red\";\n    balls[balls[\"green\"] = 4] = \"green\";\n    balls[balls[\"orange\"] = 5] = \"orange\";\n    balls[balls[\"yellow\"] = 6] = \"yellow\";\n    balls[balls[\"blue\"] = 7] = \"blue\";\n})(balls || (balls = {}));\nvar colorsArr = [\n    \"none\",\n    \"white\",\n    \"gray\",\n    \"red\",\n    \"green\",\n    \"orange\",\n    \"yellow\",\n    \"blue\",\n];\n\n\n//# sourceURL=webpack://balls/./src/consts.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Balls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Balls */ \"./src/Balls.ts\");\n\nvar game = new _Balls__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"board\");\nconsole.log(\"started\");\n\n\n//# sourceURL=webpack://balls/./src/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;