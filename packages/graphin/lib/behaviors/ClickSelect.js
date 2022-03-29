"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _useBehaviorHook = _interopRequireDefault(require("./useBehaviorHook"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_TRIGGER = 'shift'; // const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];

var defaultConfig = {
  /** 是否禁用该功能 */
  disabled: false,

  /** 是否允许多选，默认为 true，当设置为 false，表示不允许多选，此时 trigger 参数无效； */
  multiple: true,

  /** 指定按住哪个键进行多选，默认为 shift，按住 Shift 键多选，用户可配置 shift、ctrl、alt； */
  trigger: DEFAULT_TRIGGER,

  /** 选中的样式，默认为 selected */
  selectedState: 'selected'
};

var ClickSelect = function ClickSelect(props) {
  (0, _useBehaviorHook.default)({
    type: 'click-select',
    userProps: props,
    defaultConfig: defaultConfig
  });
  return null;
};

var _default = ClickSelect;
exports.default = _default;