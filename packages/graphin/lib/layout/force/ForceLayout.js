"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _graph = _interopRequireDefault(require("../utils/graph"));

var _Elements = require("./Elements");

var _ForceNBody = require("./ForceNBody");

var _Point = _interopRequireDefault(require("./Point"));

var _Spring = _interopRequireDefault(require("./Spring"));

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ForceLayout = /*#__PURE__*/_createClass(function ForceLayout(options) {
  var _this = this;

  _classCallCheck(this, ForceLayout);

  /**
   * Iterate options to update this.props
   * @param {*} options
   */
  this.updateOptions = function (options) {
    if (!options) {
      return;
    }

    Object.keys(options).forEach(function (key) {
      _this.props[key] = options[key];
    });
  };

  this.setData = function (data) {
    // clean all data
    _this.nodes = [];
    _this.edges = [];
    _this.nodeSet = {};
    _this.edgeSet = {};
    _this.nodePoints = new Map();
    _this.edgeSprings = new Map();
    _this.sourceData = data;
    _this.judgingDistance = 0; // add nodes and edges

    if ('nodes' in data || 'edges' in data) {
      _this.addNodes(data.nodes); // eslint-disable-next-line


      _this.addEdges(data.edges);
    }
  };

  this.getMass = function (node) {
    var _a;

    var _ref = node.layout || {},
        _ref$degree = _ref.degree,
        degree = _ref$degree === void 0 ? (_a = _graph.default.getDegree(node, _this.edges)) === null || _a === void 0 ? void 0 : _a.degree : _ref$degree,
        force = _ref.force;
    /** 当你在layout.force.mass中制定了才使用 */


    if (force && force.mass) {
      // eslint-disable-next-line prefer-destructuring
      return force.mass;
    }
    /** 默认质量都是通过节点的度数自动计算的 */


    return degree < 5 ? 1 : degree * 5;
  };

  this.init = function () {
    /** 初始化点和边的信息 */
    var _this$props = _this.props,
        width = _this$props.width,
        height = _this$props.height;
    var centripetalOptions = _this.props.centripetalOptions;
    var _this$props2 = _this.props,
        leafCluster = _this$props2.leafCluster,
        clustering = _this$props2.clustering,
        nodeClusterBy = _this$props2.nodeClusterBy,
        propsClusterNodeStrength = _this$props2.clusterNodeStrength;

    var getClusterNodeStrength = function getClusterNodeStrength(node) {
      return typeof propsClusterNodeStrength === 'function' ? propsClusterNodeStrength(node) : propsClusterNodeStrength;
    }; // 如果传入了需要叶子节点聚类


    if (leafCluster) {
      centripetalOptions = {
        single: 100,
        leaf: function leaf(node, nodes, edges) {
          var relativeNodesType = _graph.default.getRelativeNodesType(nodes, nodeClusterBy); // 找出与它关联的边的起点或终点出发的所有一度节点中同类型的叶子节点


          var _Utils$getCoreNodeAnd = _graph.default.getCoreNodeAndRelativeLeafNodes('leaf', node, edges, nodeClusterBy),
              relativeLeafNodes = _Utils$getCoreNodeAnd.relativeLeafNodes,
              sameTypeLeafNodes = _Utils$getCoreNodeAnd.sameTypeLeafNodes; // 如果都是同一类型或者每种类型只有1个，则施加默认向心力


          if ((sameTypeLeafNodes === null || sameTypeLeafNodes === void 0 ? void 0 : sameTypeLeafNodes.length) === (relativeLeafNodes === null || relativeLeafNodes === void 0 ? void 0 : relativeLeafNodes.length) || (relativeNodesType === null || relativeNodesType === void 0 ? void 0 : relativeNodesType.length) === 1) {
            return 1;
          }

          return getClusterNodeStrength(node);
        },
        others: 1,
        center: function center(node, nodes, edges) {
          var _a;

          var _ref2 = ((_a = node.data) === null || _a === void 0 ? void 0 : _a.layout) || {},
              degree = _ref2.degree; // 孤点默认给1个远离的中心点


          if (!degree) {
            return {
              x: 100,
              y: 100
            };
          }

          var centerNode;

          if (degree === 1) {
            // 如果为叶子节点
            // 找出与它关联的边的起点出发的所有一度节点中同类型的叶子节点
            var _Utils$getCoreNodeAnd2 = _graph.default.getCoreNodeAndRelativeLeafNodes('leaf', node, edges, nodeClusterBy),
                sameTypeLeafNodes = _Utils$getCoreNodeAnd2.sameTypeLeafNodes;

            if (sameTypeLeafNodes.length === 1) {
              // 如果同类型的叶子节点只有1个，中心节点置为undefined
              centerNode = undefined;
            } else if (sameTypeLeafNodes.length > 1) {
              // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
              centerNode = _graph.default.getAvgNodePosition(sameTypeLeafNodes);
            }
          } else {
            centerNode = undefined;
          }

          return {
            x: centerNode === null || centerNode === void 0 ? void 0 : centerNode.x,
            y: centerNode === null || centerNode === void 0 ? void 0 : centerNode.y
          };
        }
      };
    } // 如果传入了全局节点聚类


    if (clustering) {
      var clusters = Array.from(new Set(_this.nodes.map(function (node) {
        var _a;

        return (_a = node.data) === null || _a === void 0 ? void 0 : _a[nodeClusterBy];
      }))).filter(function (item) {
        return item !== undefined;
      });
      var centerNodeInfo = {};
      clusters.forEach(function (cluster) {
        var sameTypeNodes = _this.nodes.filter(function (item) {
          var _a;

          return ((_a = item.data) === null || _a === void 0 ? void 0 : _a[nodeClusterBy]) === cluster;
        }); // 找出同类型节点平均位置节点的距离最近的节点作为中心节点


        centerNodeInfo[cluster] = _graph.default.getAvgNodePosition(sameTypeNodes);
      });
      centripetalOptions = {
        single: function single(node) {
          return getClusterNodeStrength(node);
        },
        leaf: function leaf(node) {
          return getClusterNodeStrength(node);
        },
        others: function others(node) {
          return getClusterNodeStrength(node);
        },
        center: function center(node, nodes, edges) {
          var _a; // 找出同类型节点平均位置节点的距离最近的节点作为中心节点


          var centerNode = centerNodeInfo[(_a = node.data) === null || _a === void 0 ? void 0 : _a[nodeClusterBy]];
          return {
            x: centerNode === null || centerNode === void 0 ? void 0 : centerNode.x,
            y: centerNode === null || centerNode === void 0 ? void 0 : centerNode.y
          };
        }
      };
    }

    _this.centripetalOptions = Object.assign(Object.assign({}, _this.centripetalOptions), centripetalOptions);

    _this.nodes.forEach(function (node) {
      var x = node.data.x || width / 2;
      var y = node.data.y || height / 2;
      var vec = new _Vector.default(x, y);

      if (!node.data.layout) {
        node.data.layout = {};
      }

      var degreeInfo = _graph.default.getDegree(node, _this.edges);

      node.data.layout = Object.assign(Object.assign({}, node.data.layout), degreeInfo);

      var mass = _this.getMass(node.data);

      _this.nodePoints.set(node.id, new _Point.default(vec, String(node.id), node.data, mass));
    });

    _this.edges.forEach(function (edge) {
      var source = _this.nodePoints.get(edge.source.id);

      var target = _this.nodePoints.get(edge.target.id);

      var length = _this.props.defSpringLen(edge, source, target);

      _this.edgeSprings.set(edge.id, new _Spring.default(source, target, length));
    });
    /** 其他参数设置 */


    var size = _this.nodePoints.size;
    var vv = Math.pow(10, 2);
    _this.props.minEnergyThreshold = 1 / 2 * Math.pow(1, 2) * 1 * size * vv;
  };

  this.start = function () {
    /** 初始化节点 */
    _this.init();

    if (_this.props.animation) _this.animation();else _this.slienceForce();
  };

  this.calTotalEnergy = function () {
    var energy = 0.0;

    _this.nodes.forEach(function (node) {
      var point = _this.nodePoints.get(node.id);

      var speed = point.v.magnitude();
      var m = point.m; // 1;

      energy += m * Math.pow(speed, 2) * 0.5; // p = 1/2*(mv^2)
    });

    return energy;
  };

  this.slienceForce = function () {
    var _this$props3 = _this.props,
        done = _this$props3.done,
        maxIterations = _this$props3.maxIterations,
        minDistanceThreshold = _this$props3.minDistanceThreshold;

    for (var i = 0; (_this.judgingDistance > minDistanceThreshold || i < 1) && i < maxIterations; i++) {
      _this.tick(_this.props.tickInterval);

      _this.iterations++;
    }

    _this.render();

    if (done) {
      done(_this.renderNodes);
    }
  };
  /** polyfill: support webworker requestAnimationFrame */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


  this.requestAnimationFrame = function (fn) {
    var enableWorker = _this.props.enableWorker;

    if (enableWorker) {
      return setInterval(function () {
        fn();
      }, 16);
    }

    return window.requestAnimationFrame(fn);
  };

  this.cancelAnimationFrame = function (handleId) {
    var enableWorker = _this.props.enableWorker;

    if (enableWorker) {
      clearInterval(handleId);
    } else {
      window.cancelAnimationFrame(handleId);
    }
  };

  this.animation = function () {
    var _this$props4 = _this.props,
        enableWorker = _this$props4.enableWorker,
        maxIterations = _this$props4.maxIterations,
        minDistanceThreshold = _this$props4.minDistanceThreshold,
        done = _this$props4.done,
        tickInterval = _this$props4.tickInterval;

    if (enableWorker) {
      var startTimer = new Date().valueOf();
      var firstTickInterval = 0.22;

      var interval = function interval(step) {
        // 目标：迭代10次，稳定在2s，函数选择需要后续考虑
        return step > 10 ? 2000 : 20 * step * step;
      };

      for (var i = 0; i < maxIterations; i++) {
        var _tickInterval = Math.max(0.02, firstTickInterval - i * 0.002);

        _this.tick(_tickInterval);

        var diff = new Date().valueOf() - startTimer;

        if (diff >= interval(i)) {
          _this.render();

          startTimer = new Date().valueOf();
        }

        var energy = _this.calTotalEnergy();
        /** 如果需要监控信息，则提供给用户 */


        var monitor = _this.registers.get('monitor');

        if (monitor) {
          monitor(_this.reportMointor(energy));
        }

        if (_this.judgingDistance < minDistanceThreshold) {
          _this.render();

          if (done) {
            done(_this.renderNodes);
          }

          return;
        }
      }

      return;
    }

    var step = function step() {
      _this.tick(tickInterval);

      _this.render();

      _this.iterations++;

      var energy = _this.calTotalEnergy();
      /** 如果需要监控信息，则提供给用户 */


      var monitor = _this.registers.get('monitor');

      if (monitor) {
        monitor(_this.reportMointor(energy));
      }

      if (_this.judgingDistance < minDistanceThreshold || _this.iterations > _this.props.maxIterations) {
        _this.cancelAnimationFrame(_this.timer);

        _this.iterations = 0;
        _this.done = true;

        if (done) {
          done(_this.renderNodes);
        }
      } else {
        _this.timer = _this.requestAnimationFrame(step);
      }
    };

    _this.timer = _this.requestAnimationFrame(step);
  };

  this.render = function () {
    var render = _this.registers.get('render');

    _this.renderNodes = [];

    _this.nodePoints.forEach(function (node) {
      _this.renderNodes.push(Object.assign(Object.assign({}, _this.nodeSet[node.id] && _this.nodeSet[node.id].data), {
        x: node.p.x,
        y: node.p.y
      }));
    });

    if (render) {
      render({
        nodes: _this.renderNodes,
        edges: _this.sourceData.edges
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('need a render function');
    }
  };

  this.reportMointor = function (energy) {
    var params = {
      energy: energy,
      iterations: _this.iterations,
      nodes: _this.nodes,
      edges: _this.edges // memory: window.performance && window.performance.memory && window.performance.memory.usedJSHeapSize,

    };
    return params;
  };

  this.tick = function (interval) {
    // this.updateCoulombsLaw();
    _this.updateCoulombsLawOptimized();

    _this.updateHookesLaw();

    _this.attractToCentre();

    _this.updateVelocity(interval);

    _this.updatePosition(interval);
  };
  /** 布局算法 */


  this.updateCoulombsLawOptimized = function () {
    // 用force-n-body结合 Barnes-Hut approximation 优化的方法
    var coulombDisScale = _this.props.coulombDisScale;
    var repulsion = _this.props.repulsion;

    var nodes = _this.nodes.map(function (n) {
      var point = _this.nodePoints.get(n.id).p;

      return {
        x: point.x,
        y: point.y
      };
    });

    var forces = (0, _ForceNBody.forceNBody)(nodes, coulombDisScale, repulsion);

    _this.nodes.forEach(function (node, i) {
      _this.nodePoints.get(node.id).updateAcc(new _Vector.default(forces[i].vx, forces[i].vy));
    });
  };

  this.updateCoulombsLaw = function () {
    var len = _this.nodes.length;

    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        // eslint-disable-next-line no-continue
        if (i === j) continue;
        var iNode = _this.nodes[i];
        var jNode = _this.nodes[j];
        var coulombDisScale = _this.props.coulombDisScale;
        var repulsion = _this.props.repulsion;

        var v = _this.nodePoints.get(iNode.id).p.subtract(_this.nodePoints.get(jNode.id).p);

        var dis = (v.magnitude() + 0.1) * coulombDisScale;
        var direction = v.normalise(); // 向量的方向：基向量

        var factor = 1;

        _this.nodePoints.get(iNode.id).updateAcc( // 得到库伦力
        direction.scalarMultip(repulsion * factor).divide(Math.pow(dis, 2)));

        _this.nodePoints.get(jNode.id).updateAcc(direction.scalarMultip(repulsion * factor).divide(-Math.pow(dis, 2)));
      }
    }
  };

  this.updateHookesLaw = function () {
    _this.edges.forEach(function (edge) {
      var spring = _this.edgeSprings.get(edge.id);

      var v = spring.target.p.subtract(spring.source.p);
      var displacement = spring.length - v.magnitude();
      var direction = v.normalise();
      spring.source.updateAcc(direction.scalarMultip(-_this.props.stiffness * displacement));
      spring.target.updateAcc(direction.scalarMultip(_this.props.stiffness * displacement));
    });
  };

  this.attractToCentre = function () {
    var implementForce = function implementForce(node, center) {
      var radio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

      var point = _this.nodePoints.get(node.id);

      var direction = point.p.subtract(center);
      point.updateAcc(direction.scalarMultip(-radio));
    };

    _this.nodes.forEach(function (node) {
      var _a;

      var _ref3 = (_a = node.data) === null || _a === void 0 ? void 0 : _a.layout,
          degree = _ref3.degree,
          sDegree = _ref3.sDegree,
          tDegree = _ref3.tDegree;

      var _this$centripetalOpti = _this.centripetalOptions,
          finalLeaf = _this$centripetalOpti.leaf,
          finalSingle = _this$centripetalOpti.single,
          finalOthers = _this$centripetalOpti.others,
          center = _this$centripetalOpti.center;
      var _this$props5 = _this.props,
          width = _this$props5.width,
          height = _this$props5.height;

      if (center === undefined) {
        return;
      }

      var _center = center(node, _this.nodes, _this.edges, width, height),
          x = _center.x,
          y = _center.y,
          centerStrength = _center.centerStrength;

      if (x === undefined || y === undefined) {
        return;
      }

      var centerVector = new _Vector.default(x, y);

      if (centerStrength) {
        implementForce(node, centerVector, centerStrength);
        return;
      }

      var leaf = typeof finalLeaf === 'function' ? finalLeaf(node, _this.nodes, _this.edges) : finalLeaf;
      var single = typeof finalSingle === 'function' ? finalSingle(node) : finalSingle;
      var others = typeof finalOthers === 'function' ? finalOthers(node) : finalOthers; // 没有出度或没有入度，都认为是叶子节点

      var leafNode = tDegree === 0 || sDegree === 0;
      var singleNode = degree === 0;
      /** 如果radio为0，则认为忽略向心力 */

      if (leaf === 0 || single === 0 || others === 0) {
        return;
      }

      if (singleNode) {
        implementForce(node, centerVector, single);
        return;
      }

      if (leafNode) {
        implementForce(node, centerVector, leaf);
        return;
      }
      /** others */


      implementForce(node, centerVector, others);
    });
  };

  this.updateVelocity = function (interval) {
    _this.nodes.forEach(function (node) {
      var point = _this.nodePoints.get(node.id);

      point.v = point.v.add(point.a.scalarMultip(interval)) // 根据加速度求速度公式 V_curr= a*@t + V_pre
      .scalarMultip(_this.props.damping);

      if (point.v.magnitude() > _this.props.maxSpeed) {
        point.v = point.v.normalise().scalarMultip(_this.props.maxSpeed);
      }

      point.a = new _Vector.default(0, 0);
    });
  };

  this.updatePosition = function (interval) {
    var _a;

    if (!((_a = _this.nodes) === null || _a === void 0 ? void 0 : _a.length)) {
      _this.judgingDistance = 0;
      return;
    }

    var distanceThresholdMode = _this.props.distanceThresholdMode;
    var sum = 0;
    if (distanceThresholdMode === 'max') _this.judgingDistance = -Infinity;else if (distanceThresholdMode === 'min') _this.judgingDistance = Infinity;

    _this.nodes.forEach(function (node) {
      var point = _this.nodePoints.get(node.id);

      point.p = point.p.add(point.v.scalarMultip(interval)); // 路程公式 s = v * t

      var distance = point.v.scalarMultip(interval);
      var distanceMagnitude = distance.magnitude();

      switch (distanceThresholdMode) {
        case 'max':
          if (_this.judgingDistance < distanceMagnitude) _this.judgingDistance = distanceMagnitude;
          break;

        case 'min':
          if (_this.judgingDistance > distanceMagnitude) _this.judgingDistance = distanceMagnitude;
          break;

        default:
          sum = sum + distanceMagnitude;
          break;
      }
    });

    if (!distanceThresholdMode || distanceThresholdMode === 'mean') _this.judgingDistance = sum / _this.nodes.length;
  };
  /**
   * add one Node
   * @param {[type]} node [description]
   */


  this.addNode = function (node) {
    var ignore = _this.props.ignore;

    if (ignore && ignore(node)) {
      return;
    }

    if (!(node.id in _this.nodeSet)) {
      _this.nodes.push(node);
    }

    _this.nodeSet[node.id] = node;
  };
  /**
   * add Nodes
   * @param {[type]} data [description]
   */


  this.addNodes = function (data) {
    data.forEach(function (node) {
      _this.addNode(new _Elements.Node(node));
    });
  };
  /**
   * add one Edge
   * @param {[type]} edge [description]
   */


  this.addEdge = function (edge) {
    if (!(edge.id in _this.edgeSet)) {
      _this.edges.push(edge);
    }

    _this.edgeSet[edge.id] = edge;
    return edge;
  };
  /**
   * add Edges
   * @param {[type]} data [description]
   */


  this.addEdges = function (data) {
    try {
      var len = data.length;

      for (var i = 0; i < len; i++) {
        var e = data[i];
        var sourceId = e.source;
        var targetId = e.target; // eslint-disable-next-line

        var node1 = _this.nodeSet[sourceId];

        if (node1 === undefined) {
          throw new TypeError("invalid node name: ".concat(e.source));
        } // eslint-disable-next-line


        var node2 = _this.nodeSet[targetId];

        if (node2 === undefined) {
          throw new TypeError("invalid node name: ".concat(e.target));
        }

        var attr = e.data;
        var edge = new _Elements.Edge(String(_this.nextEdgeId++), node1, node2, attr);

        _this.addEdge(edge);
      }
    } catch (error) {
      console.error(error);
    }
  }; // eslint-disable-next-line @typescript-eslint/no-explicit-any


  this.register = function (type, options) {
    _this.registers.set(type, options); // 将用户的自定义函数注册进来

  };

  this.restart = function (dragNodes, graph) {
    /** 将位置更新到nodePoint中 */
    var ignore = _this.props.ignore;
    graph.getNodes().forEach(function (nodeItem) {
      var node = nodeItem.get('model');

      if (ignore && ignore(node)) {
        return;
      }

      var vec = new _Vector.default(node.x, node.y);

      var point = _this.nodePoints.get(node.id);

      if (point) {
        point.p = vec;

        _this.nodePoints.set(node.id, point);
      }
    });

    var changeNodePosition = function changeNodePosition(node) {
      var vec = new _Vector.default(node.x, node.y);

      var mass = _this.getMass(node);

      _this.nodePoints.set(node.id, new _Point.default(vec, node.id, node.data, mass));

      _this.edges.forEach(function (edge) {
        var source = _this.nodePoints.get(edge.source.id);

        var target = _this.nodePoints.get(edge.target.id);

        if (source.id === node.id || target.id === node.id) {
          var length = _this.edgeSprings.get(edge.id).length || 100;

          _this.edgeSprings.set(edge.id, new _Spring.default(source, target, length));
        }
      });
    }; // TODO:支持多点拖拽


    dragNodes.forEach(changeNodePosition);
    if (_this.props.restartAnimation) _this.animation();else _this.slienceForce();
  };

  this.stop = function () {
    window.cancelAnimationFrame(_this.timer);
    _this.done = true;
  };

  this.props = {
    stiffness: 200.0,
    enableWorker: false,
    defSpringLen: function defSpringLen(edge) {
      return edge.data.spring || 200;
    },
    repulsion: 200.0 * 5,
    centripetalOptions: {
      leaf: 2,
      single: 2
    },
    leafCluster: false,
    clustering: false,
    nodeClusterBy: 'cluster',
    clusterNodeStrength: 20,
    damping: 0.9,
    minEnergyThreshold: 0.1,
    maxSpeed: 1000,
    coulombDisScale: 0.005,
    tickInterval: 0.02,
    groupFactor: 4,

    /** 浏览器16ms刷新一次，1min = 1 * 60s = 1 * 60 * 1000ms = 1 * 60 * (1000ms / 16ms)次 = 3750次 */
    maxIterations: 7440,
    minDistanceThreshold: 0.4,
    distanceThresholdMode: 'mean',
    animation: true,
    restartAnimation: true,
    width: 200,
    height: 200
  };
  this.updateOptions(options);
  /** 存放器：节点与边 */

  this.sourceData = {
    nodes: [],
    edges: [],
    combos: []
  };
  this.nodes = [];
  this.edges = [];
  this.nodeSet = {};
  this.edgeSet = {};
  this.renderNodes = [];
  this.nodePoints = new Map();
  this.edgeSprings = new Map();
  this.registers = new Map();
  this.done = false;
  this.judgingDistance = 0;
  /** 计数器 */

  this.iterations = 0;
  this.nextEdgeId = 0; // 边属性计数自增

  this.timer = 0;
  this.center = new _Vector.default(0, 0);
  /** 默认的向心配置 */

  this.centripetalOptions = {
    leaf: 2,
    single: 2,
    others: 1,
    // eslint-disable-next-line
    center: function center(_node) {
      return {
        x: _this.props.width / 2,
        y: _this.props.height / 2
      };
    }
  };
  this.dragNodes = [];
});

var _default = ForceLayout;
exports.default = _default;