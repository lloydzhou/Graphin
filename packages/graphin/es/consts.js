export var DEFAULT_TREE_LATOUT_OPTIONS = {
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
export var TREE_LAYOUTS = ['dendrogram', 'compactBox', 'mindmap', 'indented'];