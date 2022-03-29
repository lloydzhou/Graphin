function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck


import G6 from '@antv/g6';
import { deepMix } from '@antv/util';
import { getDefaultStyleByTheme } from '../theme';
import { setStatusStyle } from './utils';

var getStyleByTheme = function getStyleByTheme() {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var themeResult = getDefaultStyleByTheme(theme);
  var defaultEdgeStyle = themeResult.defaultEdgeStyle,
      defaultEdgeStatusStyle = themeResult.defaultEdgeStatusStyle;
  return {
    style: defaultEdgeStyle.style,
    status: defaultEdgeStatusStyle.status
  };
};

export var EnumNodeAndEdgeStatus;

(function (EnumNodeAndEdgeStatus) {
  EnumNodeAndEdgeStatus["NORMAL"] = "normal";
  EnumNodeAndEdgeStatus["SELECTED"] = "selected";
  EnumNodeAndEdgeStatus["HOVERED"] = "hovered";
  EnumNodeAndEdgeStatus["DISABLED"] = "disabled";
})(EnumNodeAndEdgeStatus || (EnumNodeAndEdgeStatus = {}));

export function removeDumpAttrs(attrs) {
  Object.keys(attrs).forEach(function (key) {
    if (attrs[key] === undefined) {
      delete attrs[key];
    }
  });
  return attrs;
}
export function parseLabel(json) {
  var value = json.value,
      others = __rest(json, ["value"]);

  var attrs = Object.assign({
    id: 'label',
    text: value
  }, others);
  return removeDumpAttrs(attrs);
}
export function parseKeyShape(json) {
  var others = __rest(json, []);

  var attrs = Object.assign({
    id: 'keyshape'
  }, others);
  return removeDumpAttrs(attrs);
}
export function parseHalo(json) {
  var others = __rest(json, []);

  var attrs = Object.assign({
    id: 'halo'
  }, others);
  return removeDumpAttrs(attrs);
}

var parseAttr = function parseAttr(style, itemShapeName) {
  if (itemShapeName === 'keyshape') {
    return parseKeyShape(style.keyshape || {});
  }

  if (itemShapeName === 'halo') {
    return parseHalo(style.halo || {});
  }

  if (itemShapeName === 'label') {
    return parseLabel(style.label || {});
  }

  return {};
}; // @ts-ignore


var getPolyEdgeControlPoint = function getPolyEdgeControlPoint(p1, p2, d) {
  var pm = {
    x: (p2.x + p1.x) / 2,
    y: (p2.y + p1.y) / 2
  };
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  var c = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  var y = pm.y - dx * d / c || 0;
  var x = pm.x + dy * d / c || 0;
  return {
    x: x,
    y: y
  };
};

var processKeyshape = function processKeyshape(cfg, style) {
  var _a, _b, _c;

  var _cfg$startPoint = cfg.startPoint,
      startPoint = _cfg$startPoint === void 0 ? {
    x: 0,
    y: 0
  } : _cfg$startPoint,
      _cfg$endPoint = cfg.endPoint,
      endPoint = _cfg$endPoint === void 0 ? {
    x: 0,
    y: 0
  } : _cfg$endPoint,
      sourceNode = cfg.sourceNode,
      targetNode = cfg.targetNode;
  var keyshape = style.keyshape;
  var _keyshape$type = keyshape.type,
      type = _keyshape$type === void 0 ? 'line' : _keyshape$type,
      _keyshape$poly = keyshape.poly,
      poly = _keyshape$poly === void 0 ? {
    distance: 0
  } : _keyshape$poly,
      _keyshape$loop = keyshape.loop,
      loop = _keyshape$loop === void 0 ? {} : _keyshape$loop;
  var source = sourceNode.get('model');
  var target = ((_a = targetNode) === null || _a === void 0 ? void 0 : _a.get('model')) || {
    id: 'temp'
  };

  if (type === 'loop' || source.id === target.id) {
    var nodeSize = ((_c = (_b = source.style) === null || _b === void 0 ? void 0 : _b.keyshape) === null || _c === void 0 ? void 0 : _c.size) || 26;

    var _Object$assign = Object.assign({
      // 默认是是节点的高度
      distance: 0,
      // x的偏移量
      dx: 8,
      rx: undefined,
      ry: undefined
    }, loop),
        distance = _Object$assign.distance,
        dx = _Object$assign.dx,
        rx = _Object$assign.rx,
        ry = _Object$assign.ry;

    var R = nodeSize / 2;
    var dy = Math.sqrt(Math.pow(R, 2) - Math.pow(dx, 2));
    var RX = rx || R * 2 * 0.5;
    var RY = ry || R * 2 * 0.6;
    return [['M', startPoint.x - dx, startPoint.y - dy],
    /**
     * A rx ry x-axis-rotation large-arc-flag sweep-flag x y
     * https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
     */
    ['A', RX + distance, RY + distance, 0, 1, 1, startPoint.x + dx, startPoint.y - dy // endPoint.y
    ]];
  }

  if (type === 'poly') {
    var controlPoints = getPolyEdgeControlPoint(startPoint, endPoint, (poly === null || poly === void 0 ? void 0 : poly.distance) || 0);
    return [['M', startPoint.x, startPoint.y],
    /**
     * 二阶贝塞尔曲线
     */
    ['Q', controlPoints.x, controlPoints.y, endPoint.x, endPoint.y]];
  } // 默认是line


  return [['M', startPoint.x, startPoint.y], ['L', endPoint.x, endPoint.y]];
}; // eslint-disable-next-line @typescript-eslint/no-explicit-any


export default (function () {
  G6.registerEdge('graphin-line', {
    draw: function draw(cfg, group) {
      var _a, _b, _c, _d, _e;

      var _theme = cfg.style._theme;
      this.options = getStyleByTheme(_theme);
      var style = deepMix({}, this.options.style, cfg.style);
      /** 将初始化样式存储在model中 */

      if (cfg) {
        // eslint-disable-next-line no-underscore-dangle
        cfg._initialStyle = Object.assign({}, style);
      }

      var _cfg$startPoint2 = cfg.startPoint,
          startPoint = _cfg$startPoint2 === void 0 ? {
        x: 0,
        y: 0
      } : _cfg$startPoint2,
          _cfg$endPoint2 = cfg.endPoint,
          endPoint = _cfg$endPoint2 === void 0 ? {
        x: 0,
        y: 0
      } : _cfg$endPoint2,
          sourceNode = cfg.sourceNode,
          targetNode = cfg.targetNode;
      var label = style.label,
          halo = style.halo,
          keyShapeStyle = style.keyshape;
      /** 计算目标节点的大小 */

      var source = sourceNode.get('model');
      var target = ((_a = targetNode) === null || _a === void 0 ? void 0 : _a.get('model')) || {
        id: 'temp'
      };
      var nodeSize = ((_c = (_b = source.style) === null || _b === void 0 ? void 0 : _b.keyshape) === null || _c === void 0 ? void 0 : _c.size) || 28;
      /** 计算是否为loop */

      var isLoop = (keyShapeStyle === null || keyShapeStyle === void 0 ? void 0 : keyShapeStyle.type) === 'loop' || source.id === target.id;
      var hasLabel = label.value;
      /** 计算poly控制点 */

      var isPoly = (keyShapeStyle === null || keyShapeStyle === void 0 ? void 0 : keyShapeStyle.type) === 'poly';
      var controlPoints = getPolyEdgeControlPoint(startPoint, endPoint, ((_d = keyShapeStyle === null || keyShapeStyle === void 0 ? void 0 : keyShapeStyle.poly) === null || _d === void 0 ? void 0 : _d.distance) || 0);
      var lineWidth = (keyShapeStyle === null || keyShapeStyle === void 0 ? void 0 : keyShapeStyle.lineWidth) || 1;
      var d = lineWidth + 5;
      var path = processKeyshape(cfg, style); // TODO:支持多边
      // const path = [
      //   ['M', startPoint.x, startPoint.y],
      //   ['L', endPoint.x, endPoint.y],
      // ];

      /** 光环 */

      group.addShape('path', {
        attrs: Object.assign({
          id: 'halo',
          path: path,
          lineWidth: lineWidth + 10,
          stroke: halo.stroke || keyShapeStyle.stroke,
          strokeOpacity: halo.strokeOpacity || 0.4
        }, halo),
        draggable: true,
        name: 'halo',
        visible: halo.visible !== false
      });
      /** 主路径 */

      var key = group.addShape('path', {
        attrs: Object.assign({
          id: 'keyshape',
          path: path,
          endArrow: isLoop ? undefined : {
            d: 0,
            path: "M 0,0 L ".concat(d, ",").concat(d / 2, " L ").concat(d, ",-").concat(d / 2, " Z"),
            fill: keyShapeStyle.stroke
          }
        }, keyShapeStyle),
        draggable: true,
        name: 'keyshape'
      });
      /** 标签 */

      if (hasLabel) {
        var value = label.value,
            _label$fontSize = label.fontSize,
            fontSize = _label$fontSize === void 0 ? 8 : _label$fontSize,
            _label$offset = label.offset,
            offset = _label$offset === void 0 ? [0, 0] : _label$offset,
            background = label.background,
            others = __rest(label, ["value", "fontSize", "offset", "background"]);

        var hasBackground = Boolean(background);

        var _offset = _slicedToArray(offset, 2),
            offsetX = _offset[0],
            offsetY = _offset[1];
        /** 计算标签和标签背景的旋转角度 */


        var degree = Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x));
        /** 计算标签和标签背景的位移位置 */

        var midPosition = [(startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2];

        if (isPoly) {
          // TODO: 这里label坐标计算有问题，需要调整算法, 今天搞不动了，明天再处理
          midPosition = [(controlPoints.x + midPosition[0]) / 2, (controlPoints.y + midPosition[1]) / 2];
        }

        if (endPoint.x - startPoint.x === 0) {
          degree = Math.PI / 2;
        }

        if (isLoop) {
          degree = 2 * Math.PI;
        }
        /** 设置标签的背景 */


        if (hasBackground) {
          var calcWidth = String(value).length * fontSize * 0.6;
          var calcHeight = fontSize * 1.8;
          var defaultBackground = {
            fill: '#fff',
            width: calcWidth,
            height: calcHeight,
            stroke: keyShapeStyle.stroke,
            lineWidth: 1,
            radius: 6
          };

          var _f = Object.assign(Object.assign({}, defaultBackground), background),
              fill = _f.fill,
              width = _f.width,
              height = _f.height,
              stroke = _f.stroke,
              otherBackgroundAttrs = __rest(_f, ["fill", "width", "height", "stroke"]);

          var labelBackgroundShape = group.addShape('rect', {
            attrs: Object.assign({
              id: 'label-background',
              x: -width / 2 + offsetX,
              y: -height / 2 + offsetY,
              width: width,
              height: height,
              fill: fill,
              stroke: stroke
            }, otherBackgroundAttrs),
            draggable: true,
            name: 'label-background'
          });
          /** 处理标签自动旋转问题 */

          labelBackgroundShape.rotate(degree);
          labelBackgroundShape.translate(midPosition[0], midPosition[1]);
        }
        /** 设置标签的文本 */


        var y = offsetY - fontSize / 2;

        if (isLoop) {
          y = offsetY - nodeSize * 1.6 - (((_e = keyShapeStyle === null || keyShapeStyle === void 0 ? void 0 : keyShapeStyle.loop) === null || _e === void 0 ? void 0 : _e.distance) || 0) * 2;
        }

        if (hasBackground) {
          y = offsetY + fontSize / 2;
        }

        var labelShape = group.addShape('text', {
          attrs: Object.assign({
            id: 'label',
            x: offsetX,
            y: y,
            text: value,
            fontSize: fontSize
          }, others),
          draggable: true,
          name: 'label'
        });
        /** 处理标签自动旋转问题 */

        labelShape.rotate(degree);
        labelShape.translate(midPosition[0], midPosition[1]);
      }

      return key;
    },
    setState: function setState(name, value, item) {
      var _a;

      if (!name) return;
      var model = item.getModel();
      var shapes = item.getContainer().get('children'); // 顺序根据 draw 时确定

      var initStateStyle = deepMix({}, this.options.status, model.style.status);

      var initialStyle = item.getModel()._initialStyle;

      var status = ((_a = item._cfg) === null || _a === void 0 ? void 0 : _a.states) || [];

      try {
        Object.keys(initStateStyle).forEach(function (statusKey) {
          if (name === statusKey) {
            if (value) {
              setStatusStyle(shapes, initStateStyle[statusKey], parseAttr); // 匹配到status就改变
            } else {
              setStatusStyle(shapes, initialStyle, parseAttr); // 没匹配到就重置

              status.forEach(function (key) {
                // 如果cfg.status中还有其他状态，那就重新设置回来
                setStatusStyle(shapes, initStateStyle[key], parseAttr);
              });
            }
          }
        });
      } catch (error) {
        console.error(error);
      }
    },
    afterDraw: function afterDraw(cfg, group) {
      var style = deepMix({}, this.options.style, cfg.style);
      var animate = style.animate,
          keyshape = style.keyshape;
      /** 如果没有 style.animate 就不绘制 */

      if (!animate || !animate.type || animate.visible === false) {
        return;
      } // get the keshape


      var shape = group.get('children').find(function (s) {
        return s.get('name') === 'keyshape';
      });
      var color = animate.color,
          type = animate.type,
          _animate$repeat = animate.repeat,
          repeat = _animate$repeat === void 0 ? true : _animate$repeat,
          _animate$duration = animate.duration,
          duration = _animate$duration === void 0 ? 3000 : _animate$duration;

      if (type === 'circle-running') {
        // the start position of the edge's path
        var startPoint = shape.getPoint(0); // add red circle shape

        var circle = group.addShape('circle', {
          attrs: {
            x: startPoint.x,
            y: startPoint.y,
            fill: color || keyshape.stroke,
            r: keyshape.lineWidth * 1.5 + 2
          },
          name: 'circle-shape'
        }); // animation for the red circle

        circle.animate(function (ratio) {
          var tmpPoint = shape.getPoint(ratio);
          return {
            x: tmpPoint.x,
            y: tmpPoint.y
          };
        }, {
          repeat: repeat,
          duration: duration // the duration for executing once

        });
      }

      if (type === 'line-dash') {
        var index = 0;
        var lineDash = animate.lineDash || keyshape.lineDash || [4, 2, 1, 2]; // Define the animation

        shape.animate(function () {
          index++;

          if (index > 9) {
            index = 0;
          } // returns the modified configurations here, lineDash and lineDashOffset here


          return {
            lineDash: lineDash,
            lineDashOffset: -index
          };
        }, {
          repeat: repeat,
          duration: duration // the duration for executing once

        });
      }

      if (type === 'line-growth') {
        var length = shape.getTotalLength();
        shape.animate(function (ratio) {
          // the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
          var startLen = ratio * length; // Calculate the lineDash

          return {
            lineDash: [startLen, length - startLen]
          };
        }, {
          repeat: repeat,
          duration: duration // the duration for executing once

        });
      }
    }
  });
});