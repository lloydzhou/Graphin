import * as React from 'react';
declare const defaultConfig: {
    /** 是否禁用该功能 */
    disabled: boolean;
    /** 是否允许多选，默认为 true，当设置为 false，表示不允许多选，此时 trigger 参数无效； */
    multiple: boolean;
    /** 指定按住哪个键进行多选，默认为 shift，按住 Shift 键多选，用户可配置 shift、ctrl、alt； */
    trigger: string;
    /** 选中的样式，默认为 selected */
    selectedState: string;
};
export declare type IDragCanvasProps = Partial<typeof defaultConfig>;
declare const ClickSelect: React.FunctionComponent<IDragCanvasProps>;
export default ClickSelect;
