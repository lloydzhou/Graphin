import { deepMix } from '@antv/util';

function isEven(number) {
  return number % 2 === 0;
}

function isOdd(number) {
  return !isEven(number);
}
/**
 *
 * @param edges 边的集合
 * @param {poly,loop} 设置多边和自环多边的distance
 */


var processEdges = function processEdges(edges) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    poly: 50,
    loop: 10
  },
      _ref$poly = _ref.poly,
      poly = _ref$poly === void 0 ? 50 : _ref$poly,
      _ref$loop = _ref.loop,
      loop = _ref$loop === void 0 ? 10 : _ref$loop;

  var edgesMap = {};
  edges.forEach(function (edge) {
    var source = edge.source,
        target = edge.target;
    var edgeId = "".concat(source, "-").concat(target);
    var revertEdgeId = "".concat(target, "-").concat(source);
    /** 存储edge */

    if (edgesMap[edgeId]) {
      edgesMap[edgeId].push(edge);
    } else if (edgesMap[revertEdgeId]) {
      edge.revert = true;
      edgesMap[revertEdgeId].push(edge);
    } else {
      edgesMap[edgeId] = [edge];
    }
  });
  var edgeGroups = Object.values(edgesMap);
  var newEdges = [];
  edgeGroups.forEach(function (edges) {
    if (edges.length > 1) {
      // 说明是多边的情况
      var isEvenCount = isEven(edges.length);
      edges.forEach(function (edge, i) {
        var source = edge.source,
            target = edge.target;
        var isLoop = source === target;
        var index = i; // edge.revert ? i + 1 : i;

        var distance;

        if (isEvenCount) {
          // 奇数
          var idx = Math.ceil((index + 1) / 2);
          distance = poly * idx;
        } else {
          // 偶数
          var calculateIdx = isOdd(index) ? index + 1 : index;

          var _idx = Math.ceil(calculateIdx / 2);

          distance = poly * _idx;
        }

        var resultDistance = isEven(index) ? distance : -distance; // 反向边需要revert

        if (edge.revert) {
          resultDistance = -resultDistance;
          delete edge.revert;
        }

        var keyshapeStyle = {
          type: 'poly',
          poly: {
            distance: resultDistance
          }
        };

        if (isLoop) {
          keyshapeStyle = {
            type: 'loop',
            // @ts-ignore
            loop: {
              distance: index * loop
            }
          };
        }

        deepMix(edge, {
          style: {
            keyshape: keyshapeStyle
          }
        });
        newEdges.push(edge);
      });
    } else {
      newEdges.push(edges[0]);
    }
  });
  return newEdges;
};

export default processEdges;