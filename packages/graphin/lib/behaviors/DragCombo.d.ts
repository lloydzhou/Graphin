import * as React from 'react';
declare const defaultConfig: {
    /** 是否禁用该功能 */
    disabled: boolean;
    /**  拖动 Combo 时候是否开启图形代理 delegate，即拖动 Combo 时候 Combo 不会实时跟随变动，拖动过程中有临时生成一个 delegate 图形，拖动结束后才更新 Combo 位置，默认为 false，不开启 */
    enableDelegate: boolean;
    /** delegate 的样式 */
    delegateStyle: {};
    /** 拖动嵌套的 Combo 时，只改变父 Combo 的大小，不改变层级关系，默认为 false； */
    onlyChangeComboSize: boolean;
    /** 当拖动 Combo 时，父 Combo 或进入到的 Combo 的状态值，需要用户在实例化 Graph 时在 comboStateStyles 里面配置，默认为空； */
    activeState: string;
    /** 选中 Combo 的状态，默认为 selected，需要在 comboStateStyles 里面配置； */
    selectedState: string;
};
export declare type DragComboProps = Partial<typeof defaultConfig>;
declare const DragCombo: React.FunctionComponent<DragComboProps>;
export default DragCombo;
