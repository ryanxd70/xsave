"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_document";
exports.ids = ["pages/_document"];
exports.modules = {

/***/ "./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    // Fix: Explicitly return the locale from getInitialProps to ensure TypeScript\n    // can correctly infer the 'locale' property on the component's props.\n    static async getInitialProps(ctx) {\n        const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n        return {\n            ...initialProps,\n            locale: ctx.locale\n        };\n    }\n    render() {\n        const favicon = \"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><style>path{fill:%233B82F6}@media (prefers-color-scheme:dark){path{fill:%2360A5FA}}</style><path d='M5 2L9 2L19 22L15 22Z'/><path d='M15 2L19 2L9 22L5 22Z'/></svg>\";\n        // Fix: Destructuring `locale` from `this.props` was causing a TypeScript error.\n        // Using `this.props.locale` directly resolves the issue.\n        const { locale } = this.props;\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n            lang: locale || \"en\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                        rel: \"icon\",\n                        href: favicon\n                    }, void 0, false, {\n                        fileName: \"c:\\\\xsave\\\\pages\\\\_document.tsx\",\n                        lineNumber: 21,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"c:\\\\xsave\\\\pages\\\\_document.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                            fileName: \"c:\\\\xsave\\\\pages\\\\_document.tsx\",\n                            lineNumber: 24,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                            fileName: \"c:\\\\xsave\\\\pages\\\\_document.tsx\",\n                            lineNumber: 25,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"c:\\\\xsave\\\\pages\\\\_document.tsx\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"c:\\\\xsave\\\\pages\\\\_document.tsx\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyDocument);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fZG9jdW1lbnQudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUF3RjtBQUV4RixNQUFNSyxtQkFBbUJMLHNEQUFRQTtJQUMvQiw4RUFBOEU7SUFDOUUsc0VBQXNFO0lBQ3RFLGFBQWFNLGdCQUFnQkMsR0FBb0IsRUFBRTtRQUNqRCxNQUFNQyxlQUFlLE1BQU1SLG9FQUF3QixDQUFDTztRQUNwRCxPQUFPO1lBQUUsR0FBR0MsWUFBWTtZQUFFQyxRQUFRRixJQUFJRSxNQUFNO1FBQUM7SUFDL0M7SUFFQUMsU0FBUztRQUNQLE1BQU1DLFVBQVU7UUFFaEIsZ0ZBQWdGO1FBQ2hGLHlEQUF5RDtRQUN6RCxNQUFNLEVBQUVGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQ0csS0FBSztRQUU3QixxQkFDRSw4REFBQ1gsK0NBQUlBO1lBQUNZLE1BQU1KLFVBQVU7OzhCQUNwQiw4REFBQ1AsK0NBQUlBOzhCQUNILDRFQUFDWTt3QkFBS0MsS0FBSTt3QkFBT0MsTUFBTUw7Ozs7Ozs7Ozs7OzhCQUV6Qiw4REFBQ007O3NDQUNDLDhEQUFDZCwrQ0FBSUE7Ozs7O3NDQUNMLDhEQUFDQyxxREFBVUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSW5CO0FBQ0Y7QUFFQSxpRUFBZUMsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3hzYXZlLW5leHRqcy8uL3BhZ2VzL19kb2N1bWVudC50c3g/ZDM3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jdW1lbnQsIHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdCwgRG9jdW1lbnRDb250ZXh0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCc7XG5cbmNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIC8vIEZpeDogRXhwbGljaXRseSByZXR1cm4gdGhlIGxvY2FsZSBmcm9tIGdldEluaXRpYWxQcm9wcyB0byBlbnN1cmUgVHlwZVNjcmlwdFxuICAvLyBjYW4gY29ycmVjdGx5IGluZmVyIHRoZSAnbG9jYWxlJyBwcm9wZXJ0eSBvbiB0aGUgY29tcG9uZW50J3MgcHJvcHMuXG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY3R4OiBEb2N1bWVudENvbnRleHQpIHtcbiAgICBjb25zdCBpbml0aWFsUHJvcHMgPSBhd2FpdCBEb2N1bWVudC5nZXRJbml0aWFsUHJvcHMoY3R4KTtcbiAgICByZXR1cm4geyAuLi5pbml0aWFsUHJvcHMsIGxvY2FsZTogY3R4LmxvY2FsZSB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IGZhdmljb24gPSBcImRhdGE6aW1hZ2Uvc3ZnK3htbCw8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgdmlld0JveD0nMCAwIDI0IDI0Jz48c3R5bGU+cGF0aHtmaWxsOiUyMzNCODJGNn1AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOmRhcmspe3BhdGh7ZmlsbDolMjM2MEE1RkF9fTwvc3R5bGU+PHBhdGggZD0nTTUgMkw5IDJMMTkgMjJMMTUgMjJaJy8+PHBhdGggZD0nTTE1IDJMMTkgMkw5IDIyTDUgMjJaJy8+PC9zdmc+XCI7XG5cbiAgICAvLyBGaXg6IERlc3RydWN0dXJpbmcgYGxvY2FsZWAgZnJvbSBgdGhpcy5wcm9wc2Agd2FzIGNhdXNpbmcgYSBUeXBlU2NyaXB0IGVycm9yLlxuICAgIC8vIFVzaW5nIGB0aGlzLnByb3BzLmxvY2FsZWAgZGlyZWN0bHkgcmVzb2x2ZXMgdGhlIGlzc3VlLlxuICAgIGNvbnN0IHsgbG9jYWxlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIdG1sIGxhbmc9e2xvY2FsZSB8fCAnZW4nfT5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9e2Zhdmljb259IC8+XG4gICAgICAgIDwvSGVhZD5cbiAgICAgICAgPGJvZHk+XG4gICAgICAgICAgPE1haW4gLz5cbiAgICAgICAgICA8TmV4dFNjcmlwdCAvPlxuICAgICAgICA8L2JvZHk+XG4gICAgICA8L0h0bWw+XG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNeURvY3VtZW50OyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJNeURvY3VtZW50IiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4IiwiaW5pdGlhbFByb3BzIiwibG9jYWxlIiwicmVuZGVyIiwiZmF2aWNvbiIsInByb3BzIiwibGFuZyIsImxpbmsiLCJyZWwiLCJocmVmIiwiYm9keSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_document.tsx\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("./pages/_document.tsx")));
module.exports = __webpack_exports__;

})();