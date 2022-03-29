"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TREE_LAYOUTS = exports.DEFAULT_TREE_LATOUT_OPTIONS = void 0;
var DEFAULT_TREE_LATOUT_OPTIONS = {
  type: 'compactBox',
  direction: 'LR',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getId: function getId(d) {
    return d.id;
  },
  getHeight: function getHeight() {
    return 16;
  },
  getWidth: function getWidth() {
    return 16;
  },
  getVGap: function getVGap() {
    return 80;
  },
  getHGap: function getHGap() {
    return 20;
  }
};
exports.DEFAULT_TREE_LATOUT_OPTIONS = DEFAULT_TREE_LATOUT_OPTIONS;
var TREE_LAYOUTS = ['dendrogram', 'compactBox', 'mindmap', 'indented'];
exports.TREE_LAYOUTS = TREE_LAYOUTS;