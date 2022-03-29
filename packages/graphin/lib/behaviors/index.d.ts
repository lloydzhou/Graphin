declare const _default: {
    /** 内置 */
    DragCanvas: import("react").FunctionComponent<Partial<{
        direction: string;
        enableOptimize: boolean;
        scalableRange: number;
        shouldBegin: () => boolean;
        disabled: boolean;
    }>>;
    ZoomCanvas: import("react").FunctionComponent<Partial<{
        sensitivity: number;
        minZoom: undefined;
        maxZoom: undefined;
        enableOptimize: boolean;
        optimizeZoom: number;
        fixSelectedItems: {
            fixAll: boolean;
            fixLineWidth: boolean;
            fixLabel: boolean;
            fixState: string;
        };
        disabled: boolean;
        animate: boolean;
        animateCfg: {
            duration: number;
        };
    }>>;
    ClickSelect: import("react").FunctionComponent<Partial<{
        disabled: boolean;
        multiple: boolean;
        trigger: string;
        selectedState: string;
    }>>;
    BrushSelect: import("react").FunctionComponent<Partial<{
        disabled: boolean;
        brushStyle: {
            fill: string;
            fillOpacity: number;
            stroke: string;
            lineWidth: number;
        };
        onSelect: () => void;
        onDeselect: () => void;
        selectedState: string;
        trigger: string;
        includeEdges: boolean;
    }>>;
    DragNode: import("react").FunctionComponent<Partial<{
        disabled: boolean;
        updateEdge: boolean;
        delegateStyle: {};
        enableDelegate: boolean;
        onlyChangeComboSize: boolean;
        comboActiveState: string;
        selectedState: string;
    }>>;
    ResizeCanvas: import("react").FunctionComponent<import("./ResizeCanvas").ResizeCanvasProps>;
    LassoSelect: import("react").FunctionComponent<Partial<{
        disabled: boolean;
        delegateStyle: {
            fill: string;
            fillOpacity: number;
            stroke: string;
            lineWidth: number;
        };
        onSelect: () => void;
        onDeselect: () => void;
        selectedState: string;
        trigger: string;
        includeEdges: boolean;
    }>>;
    DragCombo: import("react").FunctionComponent<Partial<{
        disabled: boolean;
        enableDelegate: boolean;
        delegateStyle: {};
        onlyChangeComboSize: boolean;
        activeState: string;
        selectedState: string;
    }>>;
    /** 可选 */
    ActivateRelations: import("react").FunctionComponent<Partial<{
        disabled: boolean;
        trigger: string;
        activeState: string;
        inactiveState: string;
        resetSelected: boolean;
    }>>;
    TreeCollapse: import("react").FunctionComponent<Partial<{
        trigger: string;
        onChange: (item: import("@antv/g6-core").Item | null, collapsed: boolean) => void;
        shouldBegin: (e: import("@antv/g6-core").IG6GraphEvent) => boolean;
    }>>;
    FitView: (props: Partial<{
        padding: number[];
        isBindLayoutChange: boolean;
    }>) => null;
    FontPaint: () => null;
    DragNodeWithForce: (props: import("./DragNodeWithForce").DragNodeWithForceProps) => null;
    Hoverable: import("react").FunctionComponent<import("./Hoverable").HoverableProps>;
};
export default _default;