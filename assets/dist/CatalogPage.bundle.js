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

/***/ "./src/js/subpages/CatalogPage.js":
/*!****************************************!*\
  !*** ./src/js/subpages/CatalogPage.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_AbstractMBP_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/AbstractMBP.js */ \"./src/js/utils/AbstractMBP.js\");\n/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/Utils.js */ \"./src/js/utils/Utils.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nfunction _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }\nfunction _possibleConstructorReturn(t, e) { if (e && (\"object\" == _typeof(e) || \"function\" == typeof e)) return e; if (void 0 !== e) throw new TypeError(\"Derived constructors may only return object or undefined\"); return _assertThisInitialized(t); }\nfunction _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); return e; }\nfunction _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }\nfunction _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }\nfunction _inherits(t, e) { if (\"function\" != typeof e && null !== e) throw new TypeError(\"Super expression must either be null or a function\"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, \"prototype\", { writable: !1 }), e && _setPrototypeOf(t, e); }\nfunction _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }\n\n\nvar CatalogPage = /*#__PURE__*/function (_AbstractMBP) {\n  function CatalogPage() {\n    var _this;\n    _classCallCheck(this, CatalogPage);\n    _this = _callSuper(this, CatalogPage);\n    _this._catalogData = {};\n    _this._init().then(_this._initializeCatalogPage.bind(_this)).then(_this._translateCatalogPage.bind(_this)).then(_this._buildCatalogPage.bind(_this)).then(_this._handleEvents.bind(_this)).then(_this._makeSceneVisible.bind(_this));\n    return _this;\n  }\n  _inherits(CatalogPage, _AbstractMBP);\n  return _createClass(CatalogPage, [{\n    key: \"_initializeCatalogPage\",\n    value: function _initializeCatalogPage() {\n      var _this2 = this;\n      return new Promise(function (resolve, reject) {\n        _this2._dom = document.getElementById('scene');\n        _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fetchData('music').then(function (data) {\n          _this2._catalogData = data;\n          resolve();\n        })[\"catch\"](reject);\n      });\n    }\n  }, {\n    key: \"_translateCatalogPage\",\n    value: function _translateCatalogPage() {\n      return new Promise(function (resolve) {\n        //      Utils.replaceNlsString(this._dom, 'CATALOG_TITLE', this._nls.merch.music);\n        //      Utils.replaceNlsString(this._dom, 'CATALOG_DESCRIPTION', this._nls.merch.apparel);\n        resolve();\n      });\n    }\n  }, {\n    key: \"_buildCatalogPage\",\n    value: function _buildCatalogPage() {\n      return new Promise(function (resolve) {\n        resolve();\n      });\n    }\n  }, {\n    key: \"_handleEvents\",\n    value: function _handleEvents() {\n      var _this3 = this;\n      return new Promise(function (resolve) {\n        _this3._dom.querySelector('#back-button').addEventListener('click', _this3._updateLocation.bind(_this3, 'creation'));\n        resolve();\n      });\n    }\n  }]);\n}(_utils_AbstractMBP_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CatalogPage);\nwindow.CatalogPage = new CatalogPage();\n\n//# sourceURL=webpack://messe-basse-production.com/./src/js/subpages/CatalogPage.js?");

/***/ }),

/***/ "./src/js/utils/AbstractMBP.js":
/*!*************************************!*\
  !*** ./src/js/utils/AbstractMBP.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _scss_mbp_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scss/mbp.scss */ \"./src/scss/mbp.scss\");\n/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils.js */ \"./src/js/utils/Utils.js\");\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n\n\nvar AbstractMBP = /*#__PURE__*/function () {\n  function AbstractMBP() {\n    _classCallCheck(this, AbstractMBP);\n    this._version = '0.2.1'; // App verison\n    this._lang = 'fr'; // By default in french\n    this._nls = null; // Translated key/values\n    this._dom = null;\n    this.evts = new window.CustomEvents();\n    this._scroll = null;\n  }\n  return _createClass(AbstractMBP, [{\n    key: \"_init\",\n    value: function _init() {\n      var _this = this;\n      return new Promise(function (resolve, reject) {\n        _this._displayConsoleWelcome();\n        _this._fetchLang().then(_this._translateNav.bind(_this)).then(_this._createMainScroll.bind(_this)).then(resolve)[\"catch\"](reject);\n      });\n    }\n  }, {\n    key: \"_displayConsoleWelcome\",\n    value: function _displayConsoleWelcome() {\n      console.log('%cHello, you hacky nerd!', 'font-size:16pt');\n      console.log(\"Do you have some piece of code you want to promote or do you need a hand with it ?\\nReach %ccontact@messe-basse-production.com%cso we can find a way to help you!\", 'text-decoration:underline;color:blue');\n    }\n  }, {\n    key: \"_fetchLang\",\n    value: function _fetchLang() {\n      var _this2 = this;\n      return new Promise(function (resolve, reject) {\n        fetch(\"/assets/json/nls/\".concat(_this2._lang, \".json\")).then(function (data) {\n          data.text().then(function (lang) {\n            _this2._nls = JSON.parse(lang);\n            resolve();\n          })[\"catch\"](reject);\n        })[\"catch\"](reject);\n      });\n    }\n  }, {\n    key: \"_translateNav\",\n    value: function _translateNav() {\n      var _this3 = this;\n      return new Promise(function (resolve) {\n        var nav = document.getElementById('navigation');\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(nav, 'NAVBAR_CREATION', _this3._nls.nav.creation);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(nav, 'NAVBAR_EVENTS', _this3._nls.nav.events);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(nav, 'NAVBAR_ABOUT', _this3._nls.nav.contact);\n        resolve();\n      });\n    }\n  }, {\n    key: \"_createMainScroll\",\n    value: function _createMainScroll() {\n      var _this4 = this;\n      return new Promise(function (resolve) {\n        _this4._scroll = new window.ScrollBar({\n          target: document.getElementById('scene'),\n          minSize: 200,\n          style: {\n            color: '#FFBF00'\n          }\n        });\n        resolve();\n      });\n    }\n  }, {\n    key: \"_sharedEvents\",\n    value: function _sharedEvents() {\n      var _this5 = this;\n      return new Promise(function (resolve) {\n        _this5._dom.querySelector('#credit-modal').addEventListener('click', _this5._openCreditModal.bind(_this5));\n        resolve();\n      });\n    }\n\n    // Called in child class, only when everything is ready on the scene\n  }, {\n    key: \"_makeSceneVisible\",\n    value: function _makeSceneVisible() {\n      var _this6 = this;\n      return new Promise(function (resolve) {\n        // Ask for page content to be displayed\n        document.getElementById('loading-overlay').style.opacity = 0;\n        document.getElementById('scene').style.opacity = 1;\n        document.getElementById('navigation').style.opacity = 1;\n        _this6._scroll.updateScrollbar();\n        setTimeout(function () {\n          document.getElementById('loading-overlay').style.display = 'none';\n          document.getElementById('socials').style.opacity = 1;\n          resolve();\n        }, 200);\n      });\n    }\n  }, {\n    key: \"_updateLocation\",\n    value: function _updateLocation(target) {\n      document.getElementById('loading-overlay').style.display = 'block';\n      document.getElementById('loading-overlay').style.opacity = 1;\n      setTimeout(function () {\n        // Ensure the overlay is removed after calling location move. Avoid issues hitting browser back button\n        setTimeout(function () {\n          document.getElementById('loading-overlay').style.opacity = 0;\n          document.getElementById('loading-overlay').style.display = 'none';\n        }, 400);\n        window.location = \"/\".concat(target);\n      }, 200); // Match loading-overlay transition timing\n    }\n  }, {\n    key: \"_openCreditModal\",\n    value: function _openCreditModal() {\n      var _this7 = this;\n      _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].fetchPage('/assets/html/modal/credit.html').then(function (dom) {\n        var modal = document.createElement('DIV');\n        modal.classList.add('modal');\n        modal.classList.add('credit');\n        modal.appendChild(dom);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(modal, 'ABOUT_TITLE', _this7._nls.aboutTitle);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(modal, 'ABOUT_DESCRIPTION1', _this7._nls.aboutDescription1);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(modal, 'ABOUT_DESCRIPTION2', _this7._nls.aboutDescription2);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(modal, 'ABOUT_DESCRIPTION3', _this7._nls.aboutDescription3);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(modal, 'ABOUT_DESCRIPTION4', _this7._nls.aboutDescription4);\n        _Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].replaceNlsString(modal, 'ABOUT_CLOSE', _this7._nls.aboutClose);\n        document.getElementById('overlay').appendChild(modal);\n        // Modal opening/closing animation\n        var closeModal = function closeModal(e) {\n          if (['overlay', 'close-modal'].indexOf(e.target.id) === -1) {\n            return;\n          }\n          document.getElementById('overlay').style.opacity = 0;\n          setTimeout(function () {\n            document.getElementById('overlay').style.display = 'none';\n            document.getElementById('overlay').innerHTML = '';\n          }, 300);\n        };\n        document.getElementById('overlay').style.display = 'flex';\n        setTimeout(function () {\n          return document.getElementById('overlay').style.opacity = 1;\n        }, 100);\n        setTimeout(function () {\n          modal.style.opacity = 1;\n          document.getElementById('overlay').addEventListener('click', closeModal);\n          document.getElementById('close-modal').addEventListener('click', closeModal);\n        }, 200);\n      });\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AbstractMBP);\n\n//# sourceURL=webpack://messe-basse-production.com/./src/js/utils/AbstractMBP.js?");

/***/ }),

/***/ "./src/js/utils/Utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/Utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\nvar Utils = /*#__PURE__*/function () {\n  function Utils() {\n    _classCallCheck(this, Utils);\n  }\n  return _createClass(Utils, null, [{\n    key: \"replaceString\",\n    value: function replaceString(element, string, value) {\n      if (!element || !element.innerHTML || !string || typeof string !== 'string' || !value || typeof value !== 'string') {\n        return false;\n      }\n      element.innerHTML = element.innerHTML.replace(string, value);\n      return true;\n    }\n  }, {\n    key: \"replaceNlsString\",\n    value: function replaceNlsString(parent, string, value) {\n      var element = parent.querySelector(\"[data-nls=\\\"\".concat(string, \"\\\"]\"));\n      if (!element || !element.innerHTML || !string || typeof string !== 'string' || !value || typeof value !== 'string') {\n        return false;\n      }\n      element.innerHTML = value;\n      return true;\n    }\n  }, {\n    key: \"sleep\",\n    value: function sleep(time) {\n      return new Promise(function (resolve) {\n        setTimeout(function () {\n          return resolve(null);\n        }, time);\n      });\n    }\n  }, {\n    key: \"fetchPage\",\n    value: function fetchPage(url) {\n      return new Promise(function (resolve, reject) {\n        fetch(url).then(function (data) {\n          data.text().then(function (htmlString) {\n            resolve(document.createRange().createContextualFragment(htmlString));\n          })[\"catch\"](reject);\n        })[\"catch\"](reject);\n      });\n    }\n  }, {\n    key: \"fetchData\",\n    value: function fetchData(url) {\n      return new Promise(function (resolve, reject) {\n        fetch(\"/assets/json/data/\".concat(url, \".json\")).then(function (data) {\n          data.json().then(resolve)[\"catch\"](reject);\n        })[\"catch\"](reject);\n      });\n    }\n  }, {\n    key: \"formatDate\",\n    value: function formatDate(date, lang) {\n      var dateObj = new Date(date);\n      var formatter = new Intl.DateTimeFormat(lang, {\n        month: 'long'\n      });\n      var month = formatter.format(dateObj);\n      if (lang === 'en') {\n        return \"\".concat(month, \" \").concat(dateObj.getDate(), \", \").concat(dateObj.getFullYear());\n      } else {\n        return \"\".concat(dateObj.getDate(), \" \").concat(Utils.capitalizeFirstLetter(month), \" \").concat(dateObj.getFullYear());\n      }\n    }\n  }, {\n    key: \"capitalizeFirstLetter\",\n    value: function capitalizeFirstLetter(string) {\n      return string.charAt(0).toUpperCase() + string.slice(1);\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Utils);\n\n//# sourceURL=webpack://messe-basse-production.com/./src/js/utils/Utils.js?");

/***/ }),

/***/ "./src/scss/mbp.scss":
/*!***************************!*\
  !*** ./src/scss/mbp.scss ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://messe-basse-production.com/./src/scss/mbp.scss?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/subpages/CatalogPage.js");
/******/ 	window.CatalogPage = __webpack_exports__["default"];
/******/ 	
/******/ })()
;