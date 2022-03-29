import * as React from 'react';
declare const defaultConfig: {
    /** 是否禁用该功能 */
    disabled: boolean;
    /** 拖动框选框的样式，包括 fill、fillOpacity、stroke 和 lineWidth 四个属性; */
    brushStyle: {
        fill: string;
        fillOpacity: number;
        stroke: string;
        lineWidth: number;
    };
    /** 选中节点时的回调，参数 nodes 表示选中的节点； */
    onSelect: () => void;
    /** 取消选中节点时的回调，参数 nodes 表示取消选中的节点； */
    onDeselect: () => void;
    /** 选中的状态，默认值为 'selected' */
    selectedState: string;
    /** 触发框选的动作，默认为 'shift'，即用户按住 Shift 键拖动就可以进行框选操作，可配置的的选项为: 'shift'、'ctrl' / 'control'、'alt' 和 'drag' ，不区分大小写 */
    trigger: string;
    /** 框选过程中是否选中边，默认为 true，用户配置为 false 时，则不选中边； */
    includeEdges: boolean;
};
export declare type IDragCanvasProps = Partial<typeof defaultConfig>;
declare const BurshSelect: React.FunctionComponent<IDragCanvasProps>;
export default BurshSelect;