/* eslint-disable no-param-reassign */
var getRandomPosition = function getRandomPosition() {
  return Math.round((Math.random() - 0.5) * 80);
};
/**
 *
 * @param currentData
 * @param options
 */


var width = 500;
var height = 300;

var tweak = function tweak(currentData, prevData) {
  var currNodes = currentData.nodes,
      currEdges = currentData.edges;
  var preNodes = prevData.nodes;
  /** 将图上之前节点的位置信息存储在positionMap中 */

  var positionMap = new Map();
  preNodes.forEach(function (item) {
    var id = item.id,
        x = item.x,
        y = item.y;
    positionMap.set(id, {
      x: x,
      y: y
    });
  });
  var incrementNodesMap = new Map();
  currNodes.forEach(function (node) {
    var id = node.id;
    var position = positionMap.get(id);

    if (position) {
      node.x = position.x;
      node.y = position.y;
    } else {
      incrementNodesMap.set(id, node);
    }
  });
  var incrementPositonMap = new Map();
  currEdges.forEach(function (edge) {
    var source = edge.source,
        target = edge.target;
    var nodeInSource = incrementNodesMap.get(source);
    var nodeInTarget = incrementNodesMap.get(target);
    var positionInSource = positionMap.get(source);
    var positionInTarget = positionMap.get(target);

    if (nodeInSource && positionInTarget) {
      incrementPositonMap.set(source, {
        // ...nodeInSource,
        x: positionInTarget.x + getRandomPosition(),
        y: positionInTarget.y + getRandomPosition()
      });
    }

    if (nodeInTarget && positionInSource) {
      incrementPositonMap.set(target, {
        // ...nodeInTarget,
        x: positionInSource.x + getRandomPosition(),
        y: positionInSource.y + getRandomPosition()
      });
    }
  });
  currNodes.forEach(function (node) {
    var id = node.id;
    var position = positionMap.get(id) || incrementPositonMap.get(id);

    if (position) {
      node.x = position.x;
      node.y = position.y;
    } else {
      node.x = width / 2 + Math.round(Math.random() * width);
      node.y = height / 2 + Math.round(Math.random() * height);
    }
  });
  return Object.assign(Object.assign({}, currentData), {
    nodes: currNodes,
    edges: currEdges
  });
};

export default tweak;