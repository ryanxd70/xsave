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

/***/ "(pages-dir-node)/./pages/_document.tsx":
/*!*****************************!*\
  !*** ./pages/_document.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    // Fix: Explicitly return the locale from getInitialProps to ensure TypeScript\n    // can correctly infer the 'locale' property on the component's props.\n    static async getInitialProps(ctx) {\n        const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n        return {\n            ...initialProps,\n            locale: ctx.locale\n        };\n    }\n    render() {\n        // FIX: The `locale` property is available on `this.props`.\n        // To work around a TypeScript error where `props` is not recognized on the\n        // `MyDocument` subclass, we cast `this` to the base `Document` type, which\n        // is known to have a `props` property.\n        const locale = this.props.locale;\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n            lang: locale || 'en',\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"icon\",\n                            href: \"/favicon.svg\",\n                            type: \"image/svg+xml\"\n                        }, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 21,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"icon\",\n                            href: \"/favicon.ico\",\n                            sizes: \"any\"\n                        }, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 22,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"shortcut icon\",\n                            href: \"/favicon.svg\"\n                        }, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                    lineNumber: 20,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 26,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 27,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                    lineNumber: 25,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyDocument);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19kb2N1bWVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdGO0FBRXhGLE1BQU1LLG1CQUFtQkwsc0RBQVFBO0lBQy9CLDhFQUE4RTtJQUM5RSxzRUFBc0U7SUFDdEUsYUFBYU0sZ0JBQWdCQyxHQUFvQixFQUFFO1FBQ2pELE1BQU1DLGVBQWUsTUFBTVIsb0VBQXdCLENBQUNPO1FBQ3BELE9BQU87WUFBRSxHQUFHQyxZQUFZO1lBQUVDLFFBQVFGLElBQUlFLE1BQU07UUFBQztJQUMvQztJQUVBQyxTQUFTO1FBQ1AsMkRBQTJEO1FBQzNELDJFQUEyRTtRQUMzRSwyRUFBMkU7UUFDM0UsdUNBQXVDO1FBQ3ZDLE1BQU1ELFNBQVMsSUFBSyxDQUFjRSxLQUFLLENBQUNGLE1BQU07UUFFOUMscUJBQ0UsOERBQUNSLCtDQUFJQTtZQUFDVyxNQUFNSCxVQUFVOzs4QkFDcEIsOERBQUNQLCtDQUFJQTs7c0NBQ0gsOERBQUNXOzRCQUFLQyxLQUFJOzRCQUFPQyxNQUFLOzRCQUFlQyxNQUFLOzs7Ozs7c0NBQzFDLDhEQUFDSDs0QkFBS0MsS0FBSTs0QkFBT0MsTUFBSzs0QkFBZUUsT0FBTTs7Ozs7O3NDQUMzQyw4REFBQ0o7NEJBQUtDLEtBQUk7NEJBQWdCQyxNQUFLOzs7Ozs7Ozs7Ozs7OEJBRWpDLDhEQUFDRzs7c0NBQ0MsOERBQUNmLCtDQUFJQTs7Ozs7c0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJbkI7QUFDRjtBQUVBLGlFQUFlQyxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJjOlxceHNhdmVkXFxwYWdlc1xcX2RvY3VtZW50LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jdW1lbnQsIHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdCwgRG9jdW1lbnRDb250ZXh0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCc7XG5cbmNsYXNzIE15RG9jdW1lbnQgZXh0ZW5kcyBEb2N1bWVudCB7XG4gIC8vIEZpeDogRXhwbGljaXRseSByZXR1cm4gdGhlIGxvY2FsZSBmcm9tIGdldEluaXRpYWxQcm9wcyB0byBlbnN1cmUgVHlwZVNjcmlwdFxuICAvLyBjYW4gY29ycmVjdGx5IGluZmVyIHRoZSAnbG9jYWxlJyBwcm9wZXJ0eSBvbiB0aGUgY29tcG9uZW50J3MgcHJvcHMuXG4gIHN0YXRpYyBhc3luYyBnZXRJbml0aWFsUHJvcHMoY3R4OiBEb2N1bWVudENvbnRleHQpIHtcbiAgICBjb25zdCBpbml0aWFsUHJvcHMgPSBhd2FpdCBEb2N1bWVudC5nZXRJbml0aWFsUHJvcHMoY3R4KTtcbiAgICByZXR1cm4geyAuLi5pbml0aWFsUHJvcHMsIGxvY2FsZTogY3R4LmxvY2FsZSB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIC8vIEZJWDogVGhlIGBsb2NhbGVgIHByb3BlcnR5IGlzIGF2YWlsYWJsZSBvbiBgdGhpcy5wcm9wc2AuXG4gICAgLy8gVG8gd29yayBhcm91bmQgYSBUeXBlU2NyaXB0IGVycm9yIHdoZXJlIGBwcm9wc2AgaXMgbm90IHJlY29nbml6ZWQgb24gdGhlXG4gICAgLy8gYE15RG9jdW1lbnRgIHN1YmNsYXNzLCB3ZSBjYXN0IGB0aGlzYCB0byB0aGUgYmFzZSBgRG9jdW1lbnRgIHR5cGUsIHdoaWNoXG4gICAgLy8gaXMga25vd24gdG8gaGF2ZSBhIGBwcm9wc2AgcHJvcGVydHkuXG4gICAgY29uc3QgbG9jYWxlID0gKHRoaXMgYXMgRG9jdW1lbnQpLnByb3BzLmxvY2FsZTtcblxuICAgIHJldHVybiAoXG4gICAgICA8SHRtbCBsYW5nPXtsb2NhbGUgfHwgJ2VuJ30+XG4gICAgICAgIDxIZWFkPlxuICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uc3ZnXCIgdHlwZT1cImltYWdlL3N2Zyt4bWxcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiL2Zhdmljb24uaWNvXCIgc2l6ZXM9XCJhbnlcIiAvPlxuICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiBocmVmPVwiL2Zhdmljb24uc3ZnXCIgLz5cbiAgICAgICAgPC9IZWFkPlxuICAgICAgICA8Ym9keT5cbiAgICAgICAgICA8TWFpbiAvPlxuICAgICAgICAgIDxOZXh0U2NyaXB0IC8+XG4gICAgICAgIDwvYm9keT5cbiAgICAgIDwvSHRtbD5cbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE15RG9jdW1lbnQ7XG4iXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJIdG1sIiwiSGVhZCIsIk1haW4iLCJOZXh0U2NyaXB0IiwiTXlEb2N1bWVudCIsImdldEluaXRpYWxQcm9wcyIsImN0eCIsImluaXRpYWxQcm9wcyIsImxvY2FsZSIsInJlbmRlciIsInByb3BzIiwibGFuZyIsImxpbmsiLCJyZWwiLCJocmVmIiwidHlwZSIsInNpemVzIiwiYm9keSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_document.tsx\n");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_document.tsx")));
module.exports = __webpack_exports__;

})();