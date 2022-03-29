import { Graph as IGraph, GraphOptions } from '@antv/g6';
import React, { ErrorInfo } from 'react';
import { ApisType } from './apis/types';
import './index.less';
/** 内置布局 */
import LayoutController from './layout';
import { ThemeData } from './theme/index';
/** types  */
import { GraphinData, GraphinProps, GraphinTreeData, IconLoader, IUserNode, PlainObject } from './typings/type';
export interface GraphinState {
    isReady: boolean;
    context: {
        graph: IGraph;
        apis: ApisType;
        theme: ThemeData;
        layout: LayoutController;
        dragNodes: IUserNode[];
        updateContext: (config: PlainObject) => void;
    };
}
export interface RegisterFunction {
    (name: string, options: {
        [key: string]: any;
    }, extendName?: string): void;
}
declare class Graphin extends React.PureComponent<GraphinProps, GraphinState> {
    static registerNode: RegisterFunction;
    static registerEdge: RegisterFunction;
    static registerCombo: RegisterFunction;
    static registerBehavior(behaviorName: string, behavior: any): void;
    static registerFontFamily(iconLoader: IconLoader): {
        [icon: string]: any;
    };
    static registerLayout(layoutName: string, layout: any): void;
    /** Graph的DOM */
    graphDOM: HTMLDivElement | null;
    /** G6 instance */
    graph: IGraph;
    /** layout */
    layout: LayoutController;
    layoutCache: boolean;
    width: number;
    height: number;
    /** 是否为 Tree Graph */
    isTree: boolean;
    /** G6实例中的 nodes,edges,combos 的 model，会比props.data中多一些引用赋值产生的属性，比如node中的 x,y */
    data: GraphinTreeData | GraphinData | undefined;
    options: GraphOptions;
    apis: ApisType;
    theme: ThemeData;
    dragNodes: IUserNode[];
    constructor(props: GraphinProps);
    initData: (data: GraphinProps['data']) => void;
    initGraphInstance: () => void;
    updateLayout: () => void;
    componentDidMount(): void;
    /**
     * 组件更新的时候
     * @param prevProps
     */
    updateOptions: () => {
        readonly [x: string]: any;
        style?: React.CSSProperties | undefined;
        theme?: Partial<import("./theme/index").ThemeType> | undefined;
        data: GraphinData | GraphinTreeData;
        layout?: import("./typings/type").Layout | undefined;
        modes?: any;
        handleAfterLayout?: ((graph: IGraph) => void) | undefined;
        defaultNode?: Partial<{
            [key: string]: any;
            type?: string | undefined;
            style: import("./typings/type").NodeStyle;
        }> | undefined;
        defaultEdge?: Partial<{
            [key: string]: any;
            type?: "graphin-line" | undefined;
            style: import("./typings/type").EdgeStyle;
        }> | undefined;
        defaultCombo?: Partial<{
            [key: string]: any;
            type?: string | undefined;
            style: import("./typings/type").ComboStyle;
        }> | undefined;
        nodeStateStyles?: {
            status: Partial<{
                hover?: Partial<import("./typings/type").NodeShapeStyle> | undefined;
                selected?: Partial<import("./typings/type").NodeShapeStyle> | undefined;
                normal?: Partial<import("./typings/type").NodeShapeStyle> | undefined;
                disabled?: Partial<import("./typings/type").NodeShapeStyle> | undefined;
                active?: Partial<import("./typings/type").NodeShapeStyle> | undefined;
                inactive?: Partial<import("./typings/type").NodeShapeStyle> | undefined;
            } | undefined>;
        } | undefined;
        edgeStateStyles?: {
            status: Partial<Partial<{
                [key: string]: any;
                selected: Partial<import("./typings/type").EdgeStyle>;
                hover: Partial<import("./typings/type").EdgeStyle>;
                disabled: Partial<import("./typings/type").EdgeStyle>;
            }>>;
        } | undefined;
        comboStateStyles?: {
            status: Partial<any>;
        } | undefined;
        width?: number | undefined;
        height?: number | undefined;
        animate?: boolean | undefined;
        animateCfg?: {
            onFrame: undefined;
            duration: number;
            easing: string;
        } | undefined;
        linkCenter?: boolean | undefined;
        parallel?: Partial<{
            offsetDiff: number;
            multiEdgeType: string;
            singleEdgeType: string;
            loopEdgeType: string;
        }> | undefined;
        children?: React.ReactNode;
    };
    /** 初始化状态 */
    initStatus: () => void;
    componentDidUpdate(prevProps: GraphinProps): void;
    /**
     * 组件移除的时候
     */
    componentWillUnmount(): void;
    /**
     * 组件崩溃的时候
     * @param error
     * @param info
     */
    componentDidCatch(error: Error, info: ErrorInfo): void;
    updateContext: (config: PlainObject) => void;
    clear: () => void;
    shouldUpdate(prevProps: GraphinProps, key: string): boolean;
    render(): JSX.Element;
}
export default Graphin;