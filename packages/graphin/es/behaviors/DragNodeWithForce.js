import React, { useEffect } from 'react';
import GraphinContext from '../GraphinContext';

var DragNodeWithForce = function DragNodeWithForce(props) {
  var _React$useContext = React.useContext(GraphinContext),
      graph = _React$useContext.graph,
      layout = _React$useContext.layout,
      dragNodes = _React$useContext.dragNodes,
      updateContext = _React$useContext.updateContext;

  var autoPin = props.autoPin,
      _props$dragNodeMass = props.dragNodeMass,
      dragNodeMass = _props$dragNodeMass === void 0 ? 10000000000 : _props$dragNodeMass;
  var instance = layout.instance;
  useEffect(function () {
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

export default DragNodeWithForce;