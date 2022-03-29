"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _g = _interopRequireDefault(require("@antv/g6"));

var _tweak = _interopRequireDefault(require("./inner/tweak"));

var _options = _interopRequireDefault(require("./utils/options"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
var isEmpty = function isEmpty(data) {
  if (data && data.nodes && data.nodes.length !== 0) {
    return false;
  }

  return true;
};

var FORCE_LAYOUTS = ['force', 'graphin-force', 'g6force', 'gForce', 'comboForce'];

var LayoutController = /*#__PURE__*/function () {
  function LayoutController(context) {
    var _this = this;

    _classCallCheck(this, LayoutController);

    /** 更新布局参数 */
    this.updateOptions = function () {
      var DEFAULT_LAYOUT = {
        type: 'concentric'
      };
      var _this$graphin = _this.graphin,
          width = _this$graphin.width,
          height = _this$graphin.height,
          props = _this$graphin.props;
      var _props$layout = props.layout,
          layout = _props$layout === void 0 ? DEFAULT_LAYOUT : _props$layout;
      /** 如果数据为空，不进行布局 */

      var _layout$type = layout.type,
          type = _layout$type === void 0 ? 'concentric' : _layout$type,
          preset = layout.preset;
      /** 通用布局参数 */

      var commonLayoutParams = {
        width: width,
        height: height,
        center: [width / 2, height / 2]
      };
      /**  */

      _this.options = Object.assign(Object.assign(Object.assign({}, commonLayoutParams), _options.default[type] || {}), layout);

      if (isEmpty(_this.graphin.data)) {
        _this.prevOptions = {};
        return;
      }
      /** 力导布局有前置布局的概念，特殊处理 */


      if (FORCE_LAYOUTS.indexOf(type) !== -1) {
        // 布局切换产生的prevType 是最低优先级
        var presetType = _this.prevOptions.type || 'grid';

        if (preset === null || preset === void 0 ? void 0 : preset.type) {
          // 用户给的preset.type是第一优先级
          presetType = preset.type;
        }

        if (isEmpty(_this.graphin.data)) {
          // 特殊场景处理，不带preset的力导，第二次渲染
          presetType = preset.type || 'grid';
        }

        _this.options.preset = Object.assign(Object.assign(Object.assign({
          type: presetType
        }, commonLayoutParams), _options.default[presetType] || {}), preset);
      }
    };

    this.processForce = function () {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      var self = _this;
      var options = self.options,
          graphin = self.graphin;
      var graph = graphin.graph;
      var type = options.type;

      if (type === 'graphin-force') {
        self.options.graph = graph;
      }

      if (type === 'force' || type === 'g6force' || type === 'gForce' || type === 'comboCombined') {
        var onTick = self.options.onTick;

        var tick = function tick() {
          if (onTick) {
            onTick();
          }
        };

        self.options.tick = tick;
        var onLayoutEnd = self.options.onLayoutEnd;

        self.options.onLayoutEnd = function () {
          self.refreshPosition();
          onLayoutEnd === null || onLayoutEnd === void 0 ? void 0 : onLayoutEnd();
          graph.emit('afterlayout');
        };
      }

      if (type === 'comboForce' || type === 'comboCombined') {
        self.options.comboTrees = graph.get('comboTrees');
      }

      var isForceLayout = {
        prev: FORCE_LAYOUTS.indexOf(self.prevOptions.type) !== -1,
        current: FORCE_LAYOUTS.indexOf(self.options.type) !== -1
      };
      var isSameLayoutType = self.options.type === self.prevOptions.type;

      if (isEmpty(graphin.data)) {
        return;
      }

      if (isForceLayout.current && !isSameLayoutType) {
        /**
         * 当前布局为force，且两次布局类型不一致
         * 应当设置当前布局的preset为前一个布局
         */
        var preset = self.options.preset;
        self.presetLayout = new _g.default.Layout[preset.type](Object.assign({}, preset) || {});
        self.presetLayout.init(graphin.data);
        self.presetLayout.execute();
        self.presetLayout.data = Object.assign({}, graphin.data);
      }

      if (isForceLayout.current && isForceLayout.prev && !self.hasPosition()) {
        /**
         * 当前布局类型为force， 前一次布局也为force
         * 渐进布局
         * 不满足每个节点都有位置信息时才计算初始位置
         */
        var prevData = self.graph.save(); // 必须从graph上取数据的原因是，用户可能拖拽改变数据

        var _preset = self.options.preset;

        if (isEmpty(prevData)) {
          // preset.type = 'grid';
          self.presetLayout = new _g.default.Layout[_preset.type](Object.assign({}, _preset) || {});
          self.presetLayout.init(graphin.data);
          self.presetLayout.execute();
          prevData = graphin.data;
        }

        graphin.data = (0, _tweak.default)(graphin.data, prevData);
      }
      /** 布局切换 */

    };

    this.refreshPosition = function () {
      var graphin = _this.graphin;
      var _graphin$options = graphin.options,
          animate = _graphin$options.animate,
          layoutAnimate = _graphin$options.layoutAnimate;
      var type = _this.options.type;

      if (animate || layoutAnimate) {
        _this.graph.positionsAnimate(type === 'comboCombined');
      } else {
        _this.graph.refreshPositions(type === 'comboCombined');
      }
    };

    this.destroy = function () {
      if (_this.presetLayout && _this.presetLayout.destroy) {
        _this.presetLayout.destroy();
      }

      if (_this.instance && _this.instance.destroy) {
        _this.instance.destroy();
      }

      _this.presetLayout = null;
      _this.instance = null;
    };

    this.getDataFromGraph = function () {
      var nodes = [];
      var edges = [];
      var combos = [];
      var comboEdges = [];

      var nodeItems = _this.graph.getNodes();

      var edgeItems = _this.graph.getEdges();

      var comboItems = _this.graph.getCombos();

      var nodeLength = nodeItems.length;

      for (var i = 0; i < nodeLength; i++) {
        var nodeItem = nodeItems[i];

        if (nodeItem && nodeItem.isVisible()) {
          var model = nodeItem.getModel();
          nodes.push(model);
        }
      }

      var edgeLength = edgeItems.length;

      for (var _i = 0; _i < edgeLength; _i++) {
        var edgeItem = edgeItems[_i];

        if (edgeItem && edgeItem.isVisible()) {
          var _model = edgeItem.getModel();

          if (!_model.isComboEdge) {
            edges.push(_model);
          } else {
            comboEdges.push(_model);
          }
        }
      }

      var comboLength = comboItems.length;

      for (var _i2 = 0; _i2 < comboLength; _i2++) {
        var comboItem = comboItems[_i2];

        if (comboItem && comboItem.isVisible()) {
          var _model2 = comboItem.getModel();

          combos.push(_model2);
        }
      }

      return {
        nodes: nodes,
        edges: edges,
        combos: combos,
        comboEdges: comboEdges
      };
    };

    this.graphin = context;
    this.graph = this.graphin.graph;
    this.presetLayout = null;
    this.prevOptions = {};
    this.init();
  } // 是否每个节点都有位置信息


  _createClass(LayoutController, [{
    key: "hasPosition",
    value: function hasPosition() {
      var graphin = this.graphin;
      var _graphin$data = graphin.data,
          data = _graphin$data === void 0 ? {} : _graphin$data; // 若收到一个空数组，Array.prototype.every() 方法在一切情况下都会返回 true

      if (!data.nodes) {
        return false;
      }

      if (data.nodes.length === 0) {
        return false;
      }

      return data.nodes.every(function (node) {
        return !window.isNaN(Number(node.x)) && !window.isNaN(Number(node.y));
      });
    }
    /**
     * 初始化布局
     */

  }, {
    key: "init",
    value: function init() {
      /** 更新布局参数 */
      this.updateOptions();
      var options = this.options,
          graphin = this.graphin;
      var data = graphin.data;
      var type = options.type;
      /** 力导布局特殊处理 */

      this.processForce();

      if (!_g.default.Layout[type]) {
        console.warn("".concat(type, " layout not found, current layout is grid"));
      }

      var LayoutClass = _g.default.Layout[type] || _g.default.Layout.grid;
      this.graph.emit('beforelayout');
      this.instance = new LayoutClass(this.options);
      this.instance.init(data);
    }
    /** 启动布局 */

  }, {
    key: "start",
    value: function start() {
      var type = this.options.type;
      this.instance.execute();

      if (type === 'force' || type === 'g6force' || type === 'gForce' || type === 'comboCombined') {
        // We emit afterlayout on options.layoutEnd()
        return;
      }

      this.refreshPosition();
      this.graph.emit('afterlayout');
    }
    /** 重新布局 */

  }, {
    key: "changeLayout",
    value: function changeLayout() {
      var _this$graphin2 = this.graphin,
          graph = _this$graphin2.graph,
          data = _this$graphin2.data,
          isTree = _this$graphin2.isTree,
          layoutCache = _this$graphin2.layoutCache;

      if (!graph || graph.destroyed || !data || !data.nodes || !data.nodes.length || layoutCache && this.hasPosition() || isTree) {
        return false;
      }

      if (FORCE_LAYOUTS.indexOf(this.options.type) !== -1) {
        this.destroy();
      }
      /** 设置前置布局参数 */


      this.prevOptions = Object.assign({}, this.options);
      /** 重新走初始化流程 */

      this.init();
      this.start();
    }
  }]);

  return LayoutController;
}();

var _default = LayoutController;
exports.default = _default;