"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _GraphinContext = _interopRequireDefault(require("../GraphinContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DragNodeWithForce = function DragNodeWithForce(props) {
  var _React$useContext = _react.default.useContext(_GraphinContext.default),
      graph = _React$useContext.graph,
      layout = _React$useContext.layout,
      dragNodes = _React$useContext.dragNodes,
      updateContext = _React$useContext.updateContext;

  var autoPin = props.autoPin,
      _props$dragNodeMass = props.dragNodeMass,
      dragNodeMass = _props$dragNodeMass === void 0 ? 10000000000 : _props$dragNodeMass;
  var instance = layout.instance;
  (0, _react.useEffect)(function () {
    var simulation = instance.simulation,
        type = instance.type;

    var handleNodeDragStart = function handleNodeDragStart() {
      console.log('drag-start', instance);

      if (simulation) {
        simulation.stop();
      }
    };

    var handleNodeDragEnd = function handleNodeDragEnd(e) {
      if (type !== 'graphin-force') {
        return;
      }

      if (e.item) {
        var nodeModel = e.item.get('model');
        nodeModel.x = e.x;
        nodeModel.y = e.y;
        nodeModel.layout = Object.assign(Object.assign({}, nodeModel.layout), {
          force: {
            mass: autoPin ? dragNodeMass : null
          }
        }); // simulation.restart([nodeModel], graph);
        // graph.refreshPositions();

        var selectedNodes = [];
        graph.getNodes().forEach(function (node) {
          if (node.hasState('selected')) {
            var selectNodeModel = node.get('model');
            selectNodeModel.layout.force = {
              mass: autoPin ? dragNodeMass : null
            };
            selectedNodes.push(selectNodeModel);
          }
        });
        var newDragNodes = dragNodes.concat([nodeModel]); // 多选拖动的场景

        if (selectedNodes.length > 1) {
          newDragNodes = newDragNodes.concat(selectedNodes);
        }

        updateContext({
          dragNodes: newDragNodes
        });
      }
    };

    graph.on('node:dragstart', handleNodeDragStart);
    graph.on('node:dragend', handleNodeDragEnd);
    return function () {
      graph.off('node:dragstart', handleNodeDragStart);
      graph.off('node:dragend', handleNodeDragEnd);
    };
  }, [graph, autoPin, instance, dragNodes, updateContext]);
  return null;
};

var _default = DragNodeWithForce;
exports.default = _default;