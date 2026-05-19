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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/document */ \"(pages-dir-node)/./node_modules/next/document.js\");\n/* harmony import */ var next_document__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_document__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass MyDocument extends (next_document__WEBPACK_IMPORTED_MODULE_1___default()) {\n    // Fix: Explicitly return the locale from getInitialProps to ensure TypeScript\n    // can correctly infer the 'locale' property on the component's props.\n    static async getInitialProps(ctx) {\n        const initialProps = await next_document__WEBPACK_IMPORTED_MODULE_1___default().getInitialProps(ctx);\n        return {\n            ...initialProps,\n            locale: ctx.locale\n        };\n    }\n    render() {\n        // FIX: The `locale` property is available on `this.props`.\n        // To work around a TypeScript error where `props` is not recognized on the\n        // `MyDocument` subclass, we cast `this` to the base `Document` type, which\n        // is known to have a `props` property.\n        const locale = this.props.locale;\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Html, {\n            lang: locale || 'en',\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Head, {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"icon\",\n                            href: \"/favicon.svg\",\n                            type: \"image/svg+xml\"\n                        }, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 22,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"icon\",\n                            href: \"/favicon.ico\",\n                            sizes: \"any\"\n                        }, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"link\", {\n                            rel: \"shortcut icon\",\n                            href: \"/favicon.svg\"\n                        }, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 24,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                    lineNumber: 21,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"body\", {\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.Main, {}, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 27,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_document__WEBPACK_IMPORTED_MODULE_1__.NextScript, {}, void 0, false, {\n                            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                            lineNumber: 28,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n                    lineNumber: 26,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"c:\\\\xsaved\\\\pages\\\\_document.tsx\",\n            lineNumber: 20,\n            columnNumber: 7\n        }, this);\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyDocument);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19kb2N1bWVudC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXdGO0FBR3hGLE1BQU1LLG1CQUFtQkwsc0RBQVFBO0lBQy9CLDhFQUE4RTtJQUM5RSxzRUFBc0U7SUFDdEUsYUFBYU0sZ0JBQWdCQyxHQUFvQixFQUFFO1FBQ2pELE1BQU1DLGVBQWUsTUFBTVIsb0VBQXdCLENBQUNPO1FBQ3BELE9BQU87WUFBRSxHQUFHQyxZQUFZO1lBQUVDLFFBQVFGLElBQUlFLE1BQU07UUFBQztJQUMvQztJQUVBQyxTQUFTO1FBQ1AsMkRBQTJEO1FBQzNELDJFQUEyRTtRQUMzRSwyRUFBMkU7UUFDM0UsdUNBQXVDO1FBQ3ZDLE1BQU1ELFNBQVMsSUFBSyxDQUFjRSxLQUFLLENBQUNGLE1BQU07UUFFOUMscUJBQ0UsOERBQUNSLCtDQUFJQTtZQUFDVyxNQUFNSCxVQUFVOzs4QkFDcEIsOERBQUNQLCtDQUFJQTs7c0NBQ0gsOERBQUNXOzRCQUFLQyxLQUFJOzRCQUFPQyxNQUFLOzRCQUFlQyxNQUFLOzs7Ozs7c0NBQzFDLDhEQUFDSDs0QkFBS0MsS0FBSTs0QkFBT0MsTUFBSzs0QkFBZUUsT0FBTTs7Ozs7O3NDQUMzQyw4REFBQ0o7NEJBQUtDLEtBQUk7NEJBQWdCQyxNQUFLOzs7Ozs7Ozs7Ozs7OEJBRWpDLDhEQUFDRzs7c0NBQ0MsOERBQUNmLCtDQUFJQTs7Ozs7c0NBQ0wsOERBQUNDLHFEQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJbkI7QUFDRjtBQUVBLGlFQUFlQyxVQUFVQSxFQUFDIiwic291cmNlcyI6WyJjOlxceHNhdmVkXFxwYWdlc1xcX2RvY3VtZW50LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRG9jdW1lbnQsIHsgSHRtbCwgSGVhZCwgTWFpbiwgTmV4dFNjcmlwdCwgRG9jdW1lbnRDb250ZXh0IH0gZnJvbSAnbmV4dC9kb2N1bWVudCc7XG5pbXBvcnQgU2NyaXB0IGZyb20gJ25leHQvc2NyaXB0JztcblxuY2xhc3MgTXlEb2N1bWVudCBleHRlbmRzIERvY3VtZW50IHtcbiAgLy8gRml4OiBFeHBsaWNpdGx5IHJldHVybiB0aGUgbG9jYWxlIGZyb20gZ2V0SW5pdGlhbFByb3BzIHRvIGVuc3VyZSBUeXBlU2NyaXB0XG4gIC8vIGNhbiBjb3JyZWN0bHkgaW5mZXIgdGhlICdsb2NhbGUnIHByb3BlcnR5IG9uIHRoZSBjb21wb25lbnQncyBwcm9wcy5cbiAgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyhjdHg6IERvY3VtZW50Q29udGV4dCkge1xuICAgIGNvbnN0IGluaXRpYWxQcm9wcyA9IGF3YWl0IERvY3VtZW50LmdldEluaXRpYWxQcm9wcyhjdHgpO1xuICAgIHJldHVybiB7IC4uLmluaXRpYWxQcm9wcywgbG9jYWxlOiBjdHgubG9jYWxlIH07XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgLy8gRklYOiBUaGUgYGxvY2FsZWAgcHJvcGVydHkgaXMgYXZhaWxhYmxlIG9uIGB0aGlzLnByb3BzYC5cbiAgICAvLyBUbyB3b3JrIGFyb3VuZCBhIFR5cGVTY3JpcHQgZXJyb3Igd2hlcmUgYHByb3BzYCBpcyBub3QgcmVjb2duaXplZCBvbiB0aGVcbiAgICAvLyBgTXlEb2N1bWVudGAgc3ViY2xhc3MsIHdlIGNhc3QgYHRoaXNgIHRvIHRoZSBiYXNlIGBEb2N1bWVudGAgdHlwZSwgd2hpY2hcbiAgICAvLyBpcyBrbm93biB0byBoYXZlIGEgYHByb3BzYCBwcm9wZXJ0eS5cbiAgICBjb25zdCBsb2NhbGUgPSAodGhpcyBhcyBEb2N1bWVudCkucHJvcHMubG9jYWxlO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxIdG1sIGxhbmc9e2xvY2FsZSB8fCAnZW4nfT5cbiAgICAgICAgPEhlYWQ+XG4gICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5zdmdcIiB0eXBlPVwiaW1hZ2Uvc3ZnK3htbFwiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5pY29cIiBzaXplcz1cImFueVwiIC8+XG4gICAgICAgICAgPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIGhyZWY9XCIvZmF2aWNvbi5zdmdcIiAvPlxuICAgICAgICA8L0hlYWQ+XG4gICAgICAgIDxib2R5PlxuICAgICAgICAgIDxNYWluIC8+XG4gICAgICAgICAgPE5leHRTY3JpcHQgLz5cbiAgICAgICAgPC9ib2R5PlxuICAgICAgPC9IdG1sPlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlEb2N1bWVudDtcbiJdLCJuYW1lcyI6WyJEb2N1bWVudCIsIkh0bWwiLCJIZWFkIiwiTWFpbiIsIk5leHRTY3JpcHQiLCJNeURvY3VtZW50IiwiZ2V0SW5pdGlhbFByb3BzIiwiY3R4IiwiaW5pdGlhbFByb3BzIiwibG9jYWxlIiwicmVuZGVyIiwicHJvcHMiLCJsYW5nIiwibGluayIsInJlbCIsImhyZWYiLCJ0eXBlIiwic2l6ZXMiLCJib2R5Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_document.tsx\n");

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