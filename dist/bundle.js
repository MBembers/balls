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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _consts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./consts */ \"./src/consts.ts\");\n/* harmony import */ var _Pathfinder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pathfinder */ \"./src/Pathfinder.ts\");\n\n\nvar Balls = /** @class */ (function () {\n    function Balls(tid) {\n        this.colsnum = 9;\n        this.rowsnum = 9;\n        this.isSelected = false;\n        this.tableDOM = document.getElementById(tid);\n        this.createEmpty();\n        this.pathfinder = new _Pathfinder__WEBPACK_IMPORTED_MODULE_1__.Pathfinder(this.board);\n        this.listeners();\n        this.render();\n    }\n    Balls.prototype.createEmpty = function () {\n        this.board = [];\n        this.cells = [];\n        for (var i = 0; i < this.rowsnum; i++) {\n            this.board.push(new Array(this.colsnum - 1));\n            this.cells.push(new Array(this.colsnum - 1));\n            var row = document.createElement(\"tr\");\n            row.id = \"r\" + i;\n            for (var j = 0; j < this.colsnum; j++) {\n                this.board[i][j] = 0;\n                var cell = document.createElement(\"td\");\n                cell.id = i + \"c\" + j;\n                this.cells[i][j] = cell;\n                row.appendChild(cell);\n            }\n            this.tableDOM.appendChild(row);\n        }\n        this.board[0][0] = 1;\n    };\n    Balls.prototype.render = function () {\n        // this.board[5][5] = 3;\n        // console.table(this.board);\n        for (var i = 0; i < this.rowsnum; i++) {\n            for (var j = 0; j < this.colsnum; j++) {\n                this.cells[i][j].className =\n                    \"cell \" + _consts__WEBPACK_IMPORTED_MODULE_0__.colorsArr[this.board[i][j]];\n            }\n        }\n    };\n    Balls.prototype.clear = function () {\n        for (var i = 0; i < this.rowsnum; i++) {\n            for (var j = 0; j < this.colsnum; j++) {\n                this.board[i][j] = 0;\n            }\n        }\n    };\n    Balls.prototype.isFull = function () {\n        for (var i = 0; i < this.rowsnum; i++) {\n            for (var j = 0; j < this.colsnum; j++) {\n                if (this.board[i][j] == 0)\n                    return false;\n            }\n        }\n        return true;\n    };\n    Balls.prototype.generateRandomBalls = function (num) {\n        for (var i = 0; i < num; i++) {\n            if (this.isFull())\n                return;\n            this.board.forEach(function (row) {\n                if (!row.includes(0))\n                    return;\n            });\n            var color = Math.floor(Math.random() * (_consts__WEBPACK_IMPORTED_MODULE_0__.colorsArr.length - 1)) + 1;\n            var y = Math.floor(Math.random() * this.rowsnum);\n            var x = Math.floor(Math.random() * this.colsnum);\n            while (this.board[y][x] != 0) {\n                y = Math.floor(Math.random() * this.rowsnum);\n                x = Math.floor(Math.random() * this.colsnum);\n            }\n            // console.log(\"color, y, x:\", color, y, x);\n            this.board[y][x] = color;\n        }\n    };\n    Balls.prototype.listeners = function () {\n        var _this = this;\n        document.getElementById(\"generate\").addEventListener(\"click\", function () {\n            _this.generateRandomBalls(3);\n            _this.render();\n        });\n        document.getElementById(\"clear\").addEventListener(\"click\", function () {\n            _this.clear();\n            _this.render();\n        });\n        document.getElementById(\"find\").addEventListener(\"click\", function () {\n            _this.pathfinder.findShortestPath({ x: 0, y: 0 }, { x: 8, y: 8 }, _this.board);\n        });\n        var _loop_1 = function (i) {\n            var _loop_2 = function (j) {\n                var cell = this_1.cells[i][j];\n                cell.addEventListener(\"click\", function (e) {\n                    if (_this.board[i][j] !== 0) {\n                        if (_this.isSelected) {\n                            _this.selectedCell.classList.remove(\"selected\");\n                            if (_this.selectedCell == cell) {\n                                _this.isSelected = false;\n                                _this.selectedCell = null;\n                            }\n                            else {\n                                cell.classList.add(\"selected\");\n                                _this.selectedCell = cell;\n                                _this.selectedCoords = { x: j, y: i };\n                            }\n                        }\n                        else {\n                            cell.classList.add(\"selected\");\n                            _this.isSelected = true;\n                            _this.selectedCell = cell;\n                            _this.selectedCoords = { x: j, y: i };\n                        }\n                    }\n                });\n                // cell.addEventListener(\"mouseleave\", () => {\n                //   for (let row of this.cells)\n                //     for (let c of row) c.classList.remove(\"path\");\n                // });\n                cell.addEventListener(\"mouseenter\", function () {\n                    for (var _i = 0, _a = _this.cells; _i < _a.length; _i++) {\n                        var row = _a[_i];\n                        for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {\n                            var c = row_1[_b];\n                            c.classList.remove(\"path\");\n                        }\n                    }\n                    // console.log(j, i);\n                    if (_this.isSelected) {\n                        var path = _this.pathfinder.findShortestPath(_this.selectedCoords, { x: j, y: i }, _this.board);\n                        for (var _c = 0, path_1 = path; _c < path_1.length; _c++) {\n                            var cellCoords = path_1[_c];\n                            _this.cells[cellCoords.y][cellCoords.x].classList.add(\"path\");\n                        }\n                    }\n                });\n            };\n            for (var j = 0; j < this_1.colsnum; j++) {\n                _loop_2(j);\n            }\n        };\n        var this_1 = this;\n        for (var i = 0; i < this.rowsnum; i++) {\n            _loop_1(i);\n        }\n    };\n    return Balls;\n}());\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Balls);\n\n\n//# sourceURL=webpack://balls/./src/Balls.ts?");

/***/ }),

/***/ "./src/Pathfinder.ts":
/*!***************************!*\
  !*** ./src/Pathfinder.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Pathfinder\": () => (/* binding */ Pathfinder)\n/* harmony export */ });\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {\n    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {\n        if (ar || !(i in from)) {\n            if (!ar) ar = Array.prototype.slice.call(from, 0, i);\n            ar[i] = from[i];\n        }\n    }\n    return to.concat(ar || Array.prototype.slice.call(from));\n};\nvar Pathfinder = /** @class */ (function () {\n    function Pathfinder(matrix) {\n        this.found = false;\n        this.setMatrix(matrix);\n    }\n    Pathfinder.prototype.setMatrix = function (matrix) {\n        this.searchMatrix = new Array(matrix.length);\n        for (var i = 0; i < matrix.length; i++) {\n            this.searchMatrix[i] = new Array(matrix[i].length);\n            for (var j = 0; j < matrix[i].length; j++) {\n                this.searchMatrix[i][j] = matrix[i][j] == 0 ? 0 : -1;\n            }\n        }\n    };\n    Pathfinder.prototype.findShortestPath = function (start, end, matrix) {\n        var currStep = 1;\n        // start = start;\n        this.end = end;\n        this.found = false;\n        if (matrix)\n            this.setMatrix(matrix);\n        // console.log(\"BALLS\");\n        // console.table(matrix);\n        var ended = false;\n        var toCheck = [];\n        if ((start.x === end.x && start.y === end.y) ||\n            this.searchMatrix[end.y][end.x] !== 0)\n            return [];\n        if (start.y - 1 >= 0)\n            toCheck.push({ x: start.x, y: start.y - 1 });\n        if (start.x + 1 < this.searchMatrix[start.y].length)\n            toCheck.push({ x: start.x + 1, y: start.y });\n        if (start.y + 1 < this.searchMatrix.length)\n            toCheck.push({ x: start.x, y: start.y + 1 });\n        if (start.x - 1 >= 0)\n            toCheck.push({ x: start.x - 1, y: start.y });\n        while (ended == false) {\n            var didChange = false;\n            var newToCheck = [];\n            for (var _i = 0, toCheck_1 = toCheck; _i < toCheck_1.length; _i++) {\n                var checkCell = toCheck_1[_i];\n                if (checkCell.x == this.end.x && checkCell.y == this.end.y) {\n                    ended = true;\n                    this.found = true;\n                }\n                if (this.searchMatrix[checkCell.y][checkCell.x] == 0 &&\n                    !(checkCell.y === start.y && checkCell.x === start.x)) {\n                    this.searchMatrix[checkCell.y][checkCell.x] = currStep;\n                    didChange = true;\n                    if (checkCell.y - 1 >= 0)\n                        newToCheck.push({ x: checkCell.x, y: checkCell.y - 1 });\n                    if (checkCell.x + 1 < this.searchMatrix[checkCell.y].length)\n                        newToCheck.push({ x: checkCell.x + 1, y: checkCell.y });\n                    if (checkCell.y + 1 < this.searchMatrix.length)\n                        newToCheck.push({ x: checkCell.x, y: checkCell.y + 1 });\n                    if (checkCell.x - 1 >= 0)\n                        newToCheck.push({ x: checkCell.x - 1, y: checkCell.y });\n                }\n            }\n            toCheck = [];\n            toCheck = __spreadArray([], newToCheck, true);\n            if (!didChange)\n                ended = true;\n            currStep++;\n        }\n        console.log(\"PATHS\", this.found);\n        // console.table(this.searchMatrix);\n        if (this.found) {\n            var currX = this.end.x;\n            var currY = this.end.y;\n            var path = [];\n            currStep = this.searchMatrix[currY][currX];\n            console.table(this.searchMatrix);\n            while (!(start.x == currX && start.y == currY)) {\n                // console.log(\"start:\", start.x, start.y);\n                var stepped = false;\n                console.log(\"curr:\", currX, currY);\n                console.log(\"start: \", start.x, start.y);\n                path.push({ x: currX, y: currY });\n                if (currY - 1 >= 0 && !stepped) {\n                    if ((this.searchMatrix[currY - 1][currX] === currStep - 1 &&\n                        currStep > 1) ||\n                        (start.x === currX && start.y === currY - 1)) {\n                        currY--;\n                        stepped = true;\n                    }\n                }\n                if (currY + 1 < this.searchMatrix.length && !stepped) {\n                    if ((this.searchMatrix[currY + 1][currX] === currStep - 1 &&\n                        currStep > 1) ||\n                        (start.x === currX && start.y === currY + 1)) {\n                        currY++;\n                        stepped = true;\n                    }\n                }\n                if (currX - 1 >= 0 && !stepped) {\n                    if ((this.searchMatrix[currY][currX - 1] === currStep - 1 &&\n                        currStep > 1) ||\n                        (start.x === currX - 1 && start.y === currY)) {\n                        currX--;\n                        stepped = true;\n                    }\n                }\n                if (currX + 1 < this.searchMatrix[currY].length && !stepped) {\n                    if ((this.searchMatrix[currY][currX + 1] === currStep - 1 &&\n                        currStep > 1) ||\n                        (start.x === currX + 1 && start.y === currY)) {\n                        currX++;\n                        stepped = true;\n                    }\n                }\n                currStep--;\n            }\n            return path;\n        }\n        else {\n            return [];\n        }\n        return [];\n    };\n    return Pathfinder;\n}());\n\n\n\n//# sourceURL=webpack://balls/./src/Pathfinder.ts?");

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