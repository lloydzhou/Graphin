"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultNodeTheme = {
  primaryColor: '#FF6A00',
  nodeSize: 26,
  mode: 'light'
};
/**
 * getNodeStyleByTheme 通过主题，获取节点的样式
 * @param inputNodeTheme
 */

var getNodeStyleByTheme = function getNodeStyleByTheme(inputNodeTheme) {
  var _Object$assign = Object.assign(Object.assign({}, defaultNodeTheme), inputNodeTheme),
      nodeSize = _Object$assign.nodeSize,
      primaryColor = _Object$assign.primaryColor,
      mode = _Object$assign.mode;

  var labelSize = 12;
  var Colors = {
    light: {
      fill: primaryColor,
      fillOpacity: 0.1,
      stroke: primaryColor,
      strokeOpacity: 1,
      icon: primaryColor,
      badge: {
        fill: primaryColor,
        stroke: primaryColor,
        font: '#fff'
      },
      label: '#000',
      disabled: '#ddd'
    },
    dark: {
      fill: primaryColor,
      fillOpacity: 0.3,
      stroke: primaryColor,
      strokeOpacity: 1,
      icon: '#fff',
      badge: {
        fill: primaryColor,
        stroke: primaryColor,
        font: '#fff'
      },
      label: '#fff',
      disabled: '#ddd3'
    }
  };
  var Color = Colors[mode];
  var defaultStyle = {
    type: 'graphin-circle',
    style: {
      keyshape: {
        size: nodeSize,
        fill: Color.fill,
        fillOpacity: Color.fillOpacity,
        stroke: Color.stroke,
        strokeOpacity: Color.strokeOpacity,
        lineWidth: 1,
        opacity: 1,
        type: 'circle'
      },
      label: {
        position: 'bottom',
        value: '',
        fill: Color.label,
        fontSize: labelSize,
        offset: 0,
        background: undefined,
        fillOpacity: 1
      },
      icon: {
        type: 'text',
        value: '',
        size: nodeSize / 2,
        fill: Color.icon,
        fillOpacity: 1,
        offset: [0, 0]
      },
      badges: [],
      halo: {
        visible: false,
        fillOpacity: 0.1
      }
    },
    status: {
      normal: {},
      selected: {
        halo: {
          visible: true
        },
        keyshape: {
          lineWidth: 5
        }
      },
      hover: {
        halo: {
          visible: true
        }
      },
      active: {},
      inactive: {
        keyshape: {
          fillOpacity: 0.04,
          strokeOpacity: 0.04
        },
        icon: {
          fillOpacity: 0.04
        },
        label: {
          fillOpacity: 0.04
        }
      },
      disabled: {
        halo: {
          visible: false
        },
        keyshape: {
          fill: Color.disabled,
          stroke: Color.disabled
        },
        icon: {
          fill: Color.disabled
        },
        label: {
          fill: Color.disabled
        }
      }
    }
  };
  return defaultStyle;
};

var _default = getNodeStyleByTheme;
exports.default = _default;