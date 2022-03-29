"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _g = _interopRequireDefault(require("@antv/g6"));

var _react = _interopRequireDefault(require("react"));

var _apis = _interopRequireDefault(require("./apis"));

var _behaviors = _interopRequireDefault(require("./behaviors"));

var _consts = require("./consts");

var _GraphinContext = _interopRequireDefault(require("./GraphinContext"));

require("./index.css");

var _layout = _interopRequireDefault(require("./layout"));

var _index2 = require("./theme/index");

var _cloneDeep = _interopRequireDefault(require("./utils/cloneDeep"));

var _deepEqual = _interopRequireDefault(require("./utils/deepEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

var DragCanvas = _behaviors.default.DragCanvas,
    ZoomCanvas = _behaviors.default.ZoomCanvas,
    DragNode = _behaviors.default.DragNode,
    DragCombo = _behaviors.default.DragCombo,
    ClickSelect = _behaviors.default.ClickSelect,
    BrushSelect = _behaviors.default.BrushSelect,
    ResizeCanvas = _behaviors.default.ResizeCanvas;

var Graphin = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(Graphin, _React$PureComponent);

  var _super = _createSuper(Graphin);

  function Graphin(props) {
    var _this;

    _classCallCheck(this, Graphin);

    _this = _super.call(this, props);
    /** Graph的DOM */

    _this.graphDOM = null;

    _this.initData = function (data) {
      if (data.children) {
        _this.isTree = true;
      }

      _this.data = (0, _cloneDeep.default)(data);
    };

    _this.initGraphInstance = function () {
      var _a = _this.props,
          theme = _a.theme,
          data = _a.data,
          layout = _a.layout,
          width = _a.width,
          height = _a.height,
          _a$defaultCombo = _a.defaultCombo,
          defaultCombo = _a$defaultCombo === void 0 ? {
        style: {},
        type: 'graphin-combo'
      } : _a$defaultCombo,
          _a$defaultEdge = _a.defaultEdge,
          defaultEdge = _a$defaultEdge === void 0 ? {
        style: {},
        type: 'graphin-line'
      } : _a$defaultEdge,
          _a$defaultNode = _a.defaultNode,
          defaultNode = _a$defaultNode === void 0 ? {
        style: {},
        type: 'graphin-circle'
      } : _a$defaultNode,
          nodeStateStyles = _a.nodeStateStyles,
          edgeStateStyles = _a.edgeStateStyles,
          comboStateStyles = _a.comboStateStyles,
          _a$modes = _a.modes,
          modes = _a$modes === void 0 ? {
        default: []
      } : _a$modes,
          animate = _a.animate,
          handleAfterLayout = _a.handleAfterLayout,
          otherOptions = __rest(_a, ["theme", "data", "layout", "width", "height", "defaultCombo", "defaultEdge", "defaultNode", "nodeStateStyles", "edgeStateStyles", "comboStateStyles", "modes", "animate", "handleAfterLayout"]);

      if (modes.default.length > 0) {
        // TODO :给用户正确的引导，推荐使用Graphin的Behaviors组件
        console.info('%c suggestion: you can use @antv/graphin Behaviors components', 'color:lightgreen');
      }
      /**  width and height */


      var _this$graphDOM = _this.graphDOM,
          clientWidth = _this$graphDOM.clientWidth,
          clientHeight = _this$graphDOM.clientHeight;
      /** shallow clone */

      _this.initData(data);
      /** 重新计算宽度 */


      _this.width = Number(width) || clientWidth || 500;
      _this.height = Number(height) || clientHeight || 500;
      var themeResult = (0, _index2.getDefaultStyleByTheme)(theme);

      var defaultNodeStyle = themeResult.defaultNodeStyle,
          defaultEdgeStyle = themeResult.defaultEdgeStyle,
          defaultComboStyle = themeResult.defaultComboStyle,
          defaultNodeStatusStyle = themeResult.defaultNodeStatusStyle,
          defaultEdgeStatusStyle = themeResult.defaultEdgeStatusStyle,
          defaultComboStatusStyle = themeResult.defaultComboStatusStyle,
          otherTheme = __rest(themeResult, ["defaultNodeStyle", "defaultEdgeStyle", "defaultComboStyle", "defaultNodeStatusStyle", "defaultEdgeStatusStyle", "defaultComboStatusStyle"]);
      /** graph type */


      _this.isTree = Boolean(data.children) || _consts.TREE_LAYOUTS.indexOf(String(layout && layout.type)) !== -1;
      var finalStyle = {
        defaultNode: {
          style: Object.assign(Object.assign({}, defaultNode.style), {
            _theme: theme
          }),
          type: defaultNode.type || 'graphin-circle'
        },
        defaultEdge: {
          style: Object.assign(Object.assign({}, defaultEdge.style), {
            _theme: theme
          }),
          type: defaultEdge.type || 'graphin-line'
        },
        defaultCombo: {
          style: Object.assign(Object.assign({}, defaultCombo.style), {
            _theme: theme
          }),
          type: defaultCombo.type || 'combo'
        },

        /** status 样式 */
        nodeStateStyles: nodeStateStyles,
        edgeStateStyles: edgeStateStyles,
        comboStateStyles: comboStateStyles // deepMix({}, defaultComboStatusStyle, comboStateStyles),

      }; // @ts-ignore

      _this.theme = Object.assign(Object.assign({}, finalStyle), otherTheme);
      _this.options = Object.assign(Object.assign(Object.assign({
        container: _this.graphDOM,
        renderer: 'canvas',
        width: _this.width,
        height: _this.height,
        animate: animate !== false
      }, finalStyle), {
        modes: modes
      }), otherOptions);

      if (_this.isTree) {
        _this.options.layout = layout || _consts.DEFAULT_TREE_LATOUT_OPTIONS;
        _this.graph = new _g.default.TreeGraph(_this.options);
      } else {
        _this.graph = new _g.default.Graph(_this.options);
      }
      /** 内置事件:AfterLayout 回调 */


      _this.graph.on('afterlayout', function () {
        if (handleAfterLayout) {
          handleAfterLayout(_this.graph);
        }
      });
      /** 装载数据 */


      _this.graph.data(_this.data);
      /** 渲染 */


      _this.graph.render();
      /** 初始化布局：仅限网图 */


      if (!_this.isTree) {
        _this.layout = new _layout.default(_assertThisInitialized(_this));

        _this.layout.start();
      } // this.graph.get('canvas').set('localRefresh', true);

      /** FitView 变为组件可选 */

      /** 初始化状态 */


      _this.initStatus();
      /** 生成API */


      _this.apis = (0, _apis.default)(_this.graph);
      /** 设置Context */

      _this.setState({
        isReady: true,
        context: {
          graph: _this.graph,
          apis: _this.apis,
          theme: _this.theme,
          layout: _this.layout,
          dragNodes: _this.dragNodes,
          updateContext: _this.updateContext
        }
      });
    };

    _this.updateLayout = function () {
      _this.layout.changeLayout();
    };
    /**
     * 组件更新的时候
     * @param prevProps
     */


    _this.updateOptions = function () {
      var options = __rest(_this.props, []);

      return options;
    };
    /** 初始化状态 */


    _this.initStatus = function () {
      if (!_this.isTree) {
        var _data = _this.props.data;
        var _data$nodes = _data.nodes,
            nodes = _data$nodes === void 0 ? [] : _data$nodes,
            _data$edges = _data.edges,
            edges = _data$edges === void 0 ? [] : _data$edges;
        nodes.forEach(function (node) {
          var status = node.status;

          if (status) {
            Object.keys(status).forEach(function (k) {
              _this.graph.setItemState(node.id, k, Boolean(status[k]));
            });
          }
        });
        edges.forEach(function (edge) {
          var status = edge.status;

          if (status) {
            Object.keys(status).forEach(function (k) {
              _this.graph.setItemState(edge.id, k, Boolean(status[k]));
            });
          }
        });
      }
    };

    _this.updateContext = function (config) {
      _this.setState(function (prevState) {
        return {
          context: Object.assign(Object.assign({}, prevState.context), config)
        };
      });
    };

    _this.clear = function () {
      if (_this.layout && _this.layout.destroy) {
        _this.layout.destroy(); // tree graph

      }

      _this.layout = {};

      _this.graph.clear();

      _this.data = {
        nodes: [],
        edges: [],
        combos: []
      };

      _this.graph.destroy();
    };

    var data = props.data,
        layout = props.layout,
        width = props.width,
        height = props.height,
        layoutCache = props.layoutCache,
        otherOptions = __rest(props, ["data", "layout", "width", "height", "layoutCache"]);

    _this.data = data;
    _this.isTree = Boolean(props.data && props.data.children) || _consts.TREE_LAYOUTS.indexOf(String(layout && layout.type)) !== -1;
    _this.graph = {};
    _this.height = Number(height);
    _this.width = Number(width);
    _this.theme = {};
    _this.apis = {};
    _this.layoutCache = layoutCache;
    _this.layout = {};
    _this.dragNodes = [];
    _this.options = Object.assign({}, otherOptions);
    _this.state = {
      isReady: false,
      context: {
        graph: _this.graph,
        apis: _this.apis,
        theme: _this.theme,
        layout: _this.layout,
        dragNodes: _this.dragNodes,
        updateContext: _this.updateContext
      }
    };
    return _this;
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  _createClass(Graphin, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initGraphInstance();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var _a, _b; // console.time('did-update');


      var isDataChange = this.shouldUpdate(prevProps, 'data');
      var isLayoutChange = this.shouldUpdate(prevProps, 'layout');
      var isOptionsChange = this.shouldUpdate(prevProps, 'options');
      var isThemeChange = this.shouldUpdate(prevProps, 'theme'); // console.timeEnd('did-update');

      var _this$props = this.props,
          data = _this$props.data,
          layoutCache = _this$props.layoutCache,
          layout = _this$props.layout;
      this.layoutCache = layoutCache; // const isGraphTypeChange = (prevProps.data as GraphinTreeData).children !== (data as GraphinTreeData).children;

      if (isThemeChange) {// TODO :Node/Edge/Combo 批量调用 updateItem 来改变
      }
      /** 图类型变化 */
      // if (isGraphTypeChange) {
      //   console.error(
      //     'The data types of pervProps.data and props.data are inconsistent,Graphin does not support the dynamic switching of TreeGraph and NetworkGraph',
      //   );
      //   return;
      // }

      /** 配置变化 */


      if (isOptionsChange) {// this.updateOptions();
      }
      /** 数据变化 */


      if (isDataChange) {
        this.initData(data);

        if (this.isTree) {
          // this.graph.data(this.data as TreeGraphData);
          this.graph.changeData(this.data);
        } else {
          var dragNodes = this.state.context.dragNodes; // 更新拖拽后的节点的mass到data
          // @ts-ignore

          (_b = (_a = this.data) === null || _a === void 0 ? void 0 : _a.nodes) === null || _b === void 0 ? void 0 : _b.forEach(function (node) {
            var _a, _b;

            var dragNode = dragNodes.find(function (item) {
              return item.id === node.id;
            });

            if (dragNode) {
              node.layout = Object.assign(Object.assign({}, node.layout), {
                force: {
                  mass: (_b = (_a = dragNode.layout) === null || _a === void 0 ? void 0 : _a.force) === null || _b === void 0 ? void 0 : _b.mass
                }
              });
            }
          });
          this.graph.data(this.data);
          this.graph.set('layoutController', null);
          this.graph.changeData(this.data); // 由于 changeData 是将 this.data 融合到 item models 上面，因此 changeData 后 models 与 this.data 不是同一个引用了
          // 执行下面一行以保证 graph item model 中的数据与 this.data 是同一份
          // @ts-ignore

          this.data = this.layout.getDataFromGraph();
          this.layout.changeLayout();
        }

        this.initStatus();
        this.apis = (0, _apis.default)(this.graph); // console.log('%c isDataChange', 'color:grey');

        this.setState(function (preState) {
          return Object.assign(Object.assign({}, preState), {
            context: {
              graph: _this2.graph,
              apis: _this2.apis,
              theme: _this2.theme,
              layout: _this2.layout,
              dragNodes: preState.context.dragNodes,
              updateContext: _this2.updateContext
            }
          });
        }, function () {
          _this2.graph.emit('graphin:datachange');

          if (isLayoutChange) {
            _this2.graph.emit('graphin:layoutchange', {
              prevLayout: prevProps.layout,
              layout: layout
            });
          }
        });
        return;
      }
      /** 布局变化 */


      if (isLayoutChange) {
        if (this.isTree) {
          // @ts-ignore
          // eslint-disable-next-line react/destructuring-assignment
          this.graph.updateLayout(this.props.layout);
          return;
        }
        /**
         * TODO
         * 1. preset 前置布局判断问题
         * 2. enablework 问题
         * 3. G6 LayoutController 里的逻辑
         */

        /** 数据需要从画布中来 */
        // @ts-ignore


        this.data = this.layout.getDataFromGraph();
        this.layout.changeLayout();
        this.layout.refreshPosition();
        /** 走G6的layoutController */
        // this.graph.updateLayout();
        // console.log('%c isLayoutChange', 'color:grey');

        this.graph.emit('graphin:layoutchange', {
          prevLayout: prevProps.layout,
          layout: layout
        });
      }
    }
    /**
     * 组件移除的时候
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clear();
    }
    /**
     * 组件崩溃的时候
     * @param error
     * @param info
     */

  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(error, info) {
      console.error('Catch component error: ', error, info);
    }
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(prevProps, key) {
      /* eslint-disable react/destructuring-assignment */
      var prevVal = prevProps[key];
      var currentVal = this.props[key];
      var isEqual = (0, _deepEqual.default)(prevVal, currentVal);
      return !isEqual;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _a;

      var isReady = this.state.isReady;
      var _this$props2 = this.props,
          modes = _this$props2.modes,
          style = _this$props2.style;
      return /*#__PURE__*/_react.default.createElement(_GraphinContext.default.Provider, {
        value: this.state.context
      }, /*#__PURE__*/_react.default.createElement("div", {
        id: "graphin-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        "data-testid": "custom-element",
        className: "graphin-core",
        ref: function ref(node) {
          _this3.graphDOM = node;
        },
        style: Object.assign({
          background: (_a = this.theme) === null || _a === void 0 ? void 0 : _a.background
        }, style)
      }), /*#__PURE__*/_react.default.createElement("div", {
        className: "graphin-components"
      }, isReady && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null,
      /** modes 不存在的时候，才启动默认的behaviors，否则会覆盖用户自己传入的 */
      !modes && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(DragCanvas, null), /*#__PURE__*/_react.default.createElement(ZoomCanvas, null), /*#__PURE__*/_react.default.createElement(DragNode, null), /*#__PURE__*/_react.default.createElement(DragCombo, null), /*#__PURE__*/_react.default.createElement(ClickSelect, null), /*#__PURE__*/_react.default.createElement(BrushSelect, null)), /*#__PURE__*/_react.default.createElement(ResizeCanvas, {
        graphDOM: this.graphDOM
      }), this.props.children))));
    }
  }], [{
    key: "registerBehavior",
    value: function registerBehavior(behaviorName, behavior) {
      _g.default.registerBehavior(behaviorName, behavior);
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "registerFontFamily",
    value: function registerFontFamily(iconLoader) {
      /**  注册 font icon */
      var iconFont = iconLoader();
      var glyphs = iconFont.glyphs,
          fontFamily = iconFont.fontFamily;
      var icons = glyphs.map(function (item) {
        return {
          name: item.name,
          unicode: String.fromCodePoint(item.unicode_decimal)
        };
      });
      return new Proxy(icons, {
        get: function get(target, propKey) {
          var matchIcon = target.find(function (icon) {
            return icon.name === propKey;
          });

          if (!matchIcon) {
            console.error("%c fontFamily:".concat(fontFamily, ",does not found ").concat(propKey, " icon"));
            return '';
          }

          return matchIcon === null || matchIcon === void 0 ? void 0 : matchIcon.unicode;
        }
      });
    } // eslint-disable-next-line @typescript-eslint/no-explicit-any

  }, {
    key: "registerLayout",
    value: function registerLayout(layoutName, layout) {
      _g.default.registerLayout(layoutName, layout);
    }
  }]);

  return Graphin;
}(_react.default.PureComponent);

Graphin.registerNode = function (nodeName, options, extendedNodeName) {
  _g.default.registerNode(nodeName, options, extendedNodeName);
};

Graphin.registerEdge = function (edgeName, options, extendedEdgeName) {
  _g.default.registerEdge(edgeName, options, extendedEdgeName);
};

Graphin.registerCombo = function (comboName, options, extendedComboName) {
  _g.default.registerCombo(comboName, options, extendedComboName);
};

var _default = Graphin;
exports.default = _default;