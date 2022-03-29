function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import Utils from '../../utils/index';
import Vector from '../force/Vector';

var getDegree = function getDegree(node, edges) {
  var nodeId = node.data.id;
  var degree = 0;
  var sDegree = 0;
  var tDegree = 0;
  edges.forEach(function (edge) {
    if (edge.source.id === nodeId) {
      sDegree += 1;
      degree += 1;
    }

    if (edge.target.id === nodeId) {
      tDegree += 1;
      degree += 1;
    }
  });
  return {
    degree: degree,
    sDegree: sDegree,
    tDegree: tDegree
  };
}; // 获取关联节点的类型信息


export var getRelativeNodesType = function getRelativeNodesType(nodes, nodeClusterBy) {
  return _toConsumableArray(new Set(nodes === null || nodes === void 0 ? void 0 : nodes.map(function (node) {
    var _a;

    return (_a = node === null || node === void 0 ? void 0 : node.data) === null || _a === void 0 ? void 0 : _a[nodeClusterBy];
  }))) || [];
}; // 找出指定节点关联的边的起点或终点

var getCoreNode = function getCoreNode(type, node, edges) {
  var _a, _b;

  if (type === 'source') {
    return ((_a = edges === null || edges === void 0 ? void 0 : edges.find(function (edge) {
      var _a;

      return ((_a = edge.target) === null || _a === void 0 ? void 0 : _a.id) === node.id;
    })) === null || _a === void 0 ? void 0 : _a.source) || {};
  }

  return ((_b = edges === null || edges === void 0 ? void 0 : edges.find(function (edge) {
    var _a;

    return ((_a = edge.source) === null || _a === void 0 ? void 0 : _a.id) === node.id;
  })) === null || _b === void 0 ? void 0 : _b.target) || {};
}; // 找出同类型的节点


var getSameTypeNodes = function getSameTypeNodes(type, nodeClusterBy, node, relativeNodes) {
  var _a;

  var typeName = ((_a = node === null || node === void 0 ? void 0 : node.data) === null || _a === void 0 ? void 0 : _a[nodeClusterBy]) || '';
  var sameTypeNodes = (relativeNodes === null || relativeNodes === void 0 ? void 0 : relativeNodes.filter(function (item) {
    var _a;

    return ((_a = item === null || item === void 0 ? void 0 : item.data) === null || _a === void 0 ? void 0 : _a[nodeClusterBy]) === typeName;
  })) || [];

  if (type === 'leaf') {
    sameTypeNodes = sameTypeNodes.filter(function (node) {
      var _a, _b, _c, _d;

      return ((_b = (_a = node.data) === null || _a === void 0 ? void 0 : _a.layout) === null || _b === void 0 ? void 0 : _b.sDegree) === 0 || ((_d = (_c = node.data) === null || _c === void 0 ? void 0 : _c.layout) === null || _d === void 0 ? void 0 : _d.tDegree) === 0;
    });
  }

  return sameTypeNodes;
}; // 找出指定节点为起点或终点的所有一度叶子节点


var getRelativeNodes = function getRelativeNodes(type, coreNode, edges) {
  var relativeNodes = [];

  switch (type) {
    case 'source':
      relativeNodes = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) {
        var _a;

        return ((_a = edge.source) === null || _a === void 0 ? void 0 : _a.id) === coreNode.id;
      }).map(function (edge) {
        return edge.target;
      });
      break;

    case 'target':
      relativeNodes = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) {
        var _a;

        return ((_a = edge.target) === null || _a === void 0 ? void 0 : _a.id) === coreNode.id;
      }).map(function (edge) {
        return edge.source;
      });
      break;

    case 'both':
      relativeNodes = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) {
        var _a;

        return ((_a = edge.source) === null || _a === void 0 ? void 0 : _a.id) === coreNode.id;
      }).map(function (edge) {
        return edge.target;
      }).concat(edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) {
        var _a;

        return ((_a = edge.target) === null || _a === void 0 ? void 0 : _a.id) === coreNode.id;
      }).map(function (edge) {
        return edge.source;
      }));
      break;

    default:
      break;
  } // 去重


  relativeNodes = Utils.uniqBy(relativeNodes, function (a, b) {
    return a.id === b.id;
  });
  return relativeNodes;
}; // 找出与指定节点关联的边的起点或终点出发的所有一度叶子节点


var getCoreNodeAndRelativeLeafNodes = function getCoreNodeAndRelativeLeafNodes(type, node, edges, nodeClusterBy) {
  var _a;

  var _ref = ((_a = node === null || node === void 0 ? void 0 : node.data) === null || _a === void 0 ? void 0 : _a.layout) || {},
      sDegree = _ref.sDegree,
      tDegree = _ref.tDegree;

  var coreNode = node;
  var relativeLeafNodes = [];

  if (sDegree === 0) {
    // 如果为没有出边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
    coreNode = getCoreNode('source', node, edges);
    relativeLeafNodes = getRelativeNodes('both', coreNode, edges);
  } else if (tDegree === 0) {
    // 如果为没有入边边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
    coreNode = getCoreNode('target', node, edges);
    relativeLeafNodes = getRelativeNodes('both', coreNode, edges);
  }

  relativeLeafNodes = relativeLeafNodes.filter(function (node) {
    var _a, _b;

    return ((_a = node.data) === null || _a === void 0 ? void 0 : _a.layout.sDegree) === 0 || ((_b = node.data) === null || _b === void 0 ? void 0 : _b.layout.tDegree) === 0;
  });
  var sameTypeLeafNodes = getSameTypeNodes(type, nodeClusterBy, node, relativeLeafNodes);
  return {
    coreNode: coreNode,
    relativeLeafNodes: relativeLeafNodes,
    sameTypeLeafNodes: sameTypeLeafNodes
  };
};

export var getMinDistanceNode = function getMinDistanceNode(sameTypeNodes) {
  var xInfo = sameTypeNodes.map(function (item) {
    return item.x;
  });
  var yInfo = sameTypeNodes.map(function (item) {
    return item.y;
  });
  var avgX = (Math.max.apply(null, xInfo) + Math.min.apply(null, xInfo)) / 2;
  var avgY = (Math.max.apply(null, yInfo) + Math.min.apply(null, yInfo)) / 2; // 计算节点和同类型节点平均位置节点的距离

  var getDistance = function getDistance(x, y) {
    return Math.sqrt((x - avgX) * (x - avgX) + (y - avgY) * (y - avgY));
  };

  var distanceInfo = sameTypeNodes.map(function (item) {
    return getDistance(item.x || 0, item.y || 0);
  }); // 找出同类型节点平均位置节点的距离最近的节点

  return sameTypeNodes[distanceInfo.findIndex(function (item) {
    return item === Math.min.apply(null, distanceInfo);
  })];
}; // 获取节点集合的平均位置信息

export var getAvgNodePosition = function getAvgNodePosition(nodes) {
  var totalNodes = new Vector(0, 0);
  nodes.forEach(function (node) {
    totalNodes = totalNodes.add(new Vector(node.x, node.y));
  }); // 获取均值向量

  var avgNode = totalNodes.divide(nodes.length).getvec();
  return {
    x: avgNode.x,
    y: avgNode.y
  };
};
export default {
  getDegree: getDegree,
  getRelativeNodesType: getRelativeNodesType,
  getCoreNodeAndRelativeLeafNodes: getCoreNodeAndRelativeLeafNodes,
  getCoreNode: getCoreNode,
  getSameTypeNodes: getSameTypeNodes,
  getMinDistanceNode: getMinDistanceNode,
  getAvgNodePosition: getAvgNodePosition
};