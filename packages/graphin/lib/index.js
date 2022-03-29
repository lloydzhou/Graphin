"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Behaviors", {
  enumerable: true,
  get: function get() {
    return _behaviors.default;
  }
});
Object.defineProperty(exports, "G6", {
  enumerable: true,
  get: function get() {
    return _g.default;
  }
});
Object.defineProperty(exports, "Graph", {
  enumerable: true,
  get: function get() {
    return _g.Graph;
  }
});
Object.defineProperty(exports, "GraphinContext", {
  enumerable: true,
  get: function get() {
    return _GraphinContext.default;
  }
});
Object.defineProperty(exports, "Utils", {
  enumerable: true,
  get: function get() {
    return _utils.default;
  }
});
exports.registerFontFamily = exports.default = void 0;

var _Graphin = _interopRequireDefault(require("./Graphin"));

var _GraphinContext = _interopRequireDefault(require("./GraphinContext"));

var _utils = _interopRequireDefault(require("./utils"));

var _behaviors = _interopRequireDefault(require("./behaviors"));

var _registerGraphinForce = _interopRequireDefault(require("./layout/inner/registerGraphinForce"));

var _registerPresetLayout = _interopRequireDefault(require("./layout/inner/registerPresetLayout"));

var _shape = require("./shape");

var _g = _interopRequireWildcard(require("@antv/g6"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 注册 Graphin force 布局 */
(0, _registerGraphinForce.default)();
/** 注册 Graphin preset 布局 */

(0, _registerPresetLayout.default)();
/** 注册 Graphin Circle Node */

(0, _shape.registerGraphinCircle)();
/** 注册 Graphin line Edge */

(0, _shape.registerGraphinLine)();
/** 解构静态方法 */

var registerFontFamily = _Graphin.default.registerFontFamily;
/** export */

exports.registerFontFamily = registerFontFamily;
var _default = _Graphin.default;
exports.default = _default;