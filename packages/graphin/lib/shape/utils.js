"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLabelXYByPosition = exports.getBadgePosition = exports.convertSizeToWH = void 0;
exports.removeDumpAttrs = removeDumpAttrs;
exports.setStatusStyle = void 0;

var _util = require("@antv/util");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

/**
 *
 * @param shapes 元素组合的shape集合
 * @param statusStyle 该节点的样式：可以是状态激活样式，也可以是默认样式
 * @param parseAttr 将用户传递的JSON解析为G理解的Attr
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var setStatusStyle = function setStatusStyle(shapes, statusStyle, parseAttr) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!statusStyle) {
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    shapes.forEach(function (shapeItem) {
      var itemShapeName = shapeItem.cfg.name;
      var style = statusStyle[itemShapeName];

      if (style) {
        var _a = parseAttr(statusStyle, itemShapeName),
            animate = _a.animate,
            visible = _a.visible,
            otherAttrs = __rest(_a, ["animate", "visible"]); // eslint-disable-next-line no-empty


        if (!shapeItem.attrs.img) {
          shapeItem.attr(otherAttrs);
          shapeItem.cfg.visible = visible !== false;

          if (animate) {
            var attrs = animate.attrs,
                animateOptions = __rest(animate, ["attrs"]);

            shapeItem.animate(attrs, animateOptions);
          }
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


exports.setStatusStyle = setStatusStyle;

function removeDumpAttrs(attrs) {
  Object.keys(attrs).forEach(function (key) {
    // @ts-ignore
    if (attrs[key] === undefined) {
      // @ts-ignore
      delete attrs[key];
    }
  });
  return attrs;
}
/**
 * 将 size 转换为宽度和高度
 * @param size
 */


var convertSizeToWH = function convertSizeToWH(size) {
  if (!size) return [0, 0];
  var width = 0;
  var height = 0;

  if ((0, _util.isNumber)(size)) {
    width = size;
    height = size;
  } else if ((0, _util.isArray)(size)) {
    if (size.length === 1) {
      var _size = _slicedToArray(size, 1),
          w = _size[0];

      width = w;
      height = w;
    } else if (size.length === 2) {
      var _size2 = _slicedToArray(size, 2),
          _w = _size2[0],
          h = _size2[1];

      width = _w;
      height = h;
    }
  }

  return [width, height];
};

exports.convertSizeToWH = convertSizeToWH;

var getLabelXYByPosition = function getLabelXYByPosition(cfg) {
  var label = cfg.label,
      keyshape = cfg.keyshape;

  if (!(keyshape === null || keyshape === void 0 ? void 0 : keyshape.size) && !(label === null || label === void 0 ? void 0 : label.offset)) {
    return {
      // @ts-ignore
      x: undefined,
      // @ts-ignore
      y: undefined,
      // @ts-ignore
      textBaseline: label === null || label === void 0 ? void 0 : label.textBaseline
    };
  }

  if (!(keyshape === null || keyshape === void 0 ? void 0 : keyshape.size) && (label === null || label === void 0 ? void 0 : label.offset)) {
    keyshape.size = 26; // 临时方案

    console.info('you should set keyshape.size when you update label position,the default keyshape size value is  26');
  }

  var size = keyshape.size;
  var offsetArray = [0, 0];
  var labelPosition = label.position,
      _label$offset = label.offset,
      offset = _label$offset === void 0 ? offsetArray : _label$offset;

  if (typeof offset === 'number' || typeof offset === 'string') {
    offsetArray = [Number(offset), Number(offset)];
  }

  if (offset.length > 0) {
    offsetArray = offset;
  }

  var _offsetArray = offsetArray,
      _offsetArray2 = _slicedToArray(_offsetArray, 2),
      offsetX = _offsetArray2[0],
      offsetY = _offsetArray2[1]; // 默认的位置（最可能的情形），所以放在最上面


  if (labelPosition === 'center') {
    return {
      x: 0 + offsetX,
      y: 0 + offsetY
    };
  }

  var wh = convertSizeToWH(size);
  var width = wh[0];
  var height = wh[1]; // eslint-disable-next-line @typescript-eslint/no-explicit-any

  var positionAttrs;

  switch (labelPosition) {
    case 'top':
      positionAttrs = {
        x: 0 + offsetX,
        y: -height / 2 - offsetY,
        textBaseline: 'bottom' // 文本在图形的上面

      };
      break;

    case 'bottom':
      positionAttrs = {
        x: 0 + offsetX,
        y: height / 2 + offsetY,
        textBaseline: 'top'
      };
      break;

    case 'left':
      positionAttrs = {
        x: 0 - width - offsetX,
        y: 0 + offsetY,
        textAlign: 'right'
      };
      break;

    case 'right':
      positionAttrs = {
        x: 0 + width + offsetX,
        y: 0 + offsetY,
        textAlign: 'left'
      };
      break;

    default:
      positionAttrs = {
        x: 0 + offsetX,
        y: height / 2 + offsetY,
        textBaseline: 'top'
      };
      break;
  }

  return positionAttrs;
};

exports.getLabelXYByPosition = getLabelXYByPosition;

var getBadgePosition = function getBadgePosition() {
  var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'RT';
  var r = arguments.length > 1 ? arguments[1] : undefined;
  var badgeX = 0;
  var badgeY = 0;

  if (position === 'LT') {
    badgeX = r * Math.cos(Math.PI * 3 / 4);
    badgeY = -r * Math.sin(Math.PI * 3 / 4);
  } else if (position === 'LB') {
    // left bottom
    badgeX = r * Math.cos(Math.PI * 5 / 4);
    badgeY = -r * Math.sin(Math.PI * 5 / 4);
  } else if (position === 'RT') {
    // right top
    badgeX = r * Math.cos(Math.PI * 1 / 4);
    badgeY = -r * Math.sin(Math.PI * 1 / 4);
  } else if (position === 'RB') {
    // right bottom
    badgeX = r * Math.cos(Math.PI * 7 / 4);
    badgeY = -r * Math.sin(Math.PI * 7 / 4);
  }

  return {
    x: badgeX,
    y: badgeY
  };
};

exports.getBadgePosition = getBadgePosition;