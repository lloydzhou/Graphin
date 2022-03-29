import cloneDeep from './cloneDeep';
declare const _default: {
    hexToRgba: (hex: string, a?: string | undefined) => string;
    debug: (name: string) => (...message: any[]) => void;
    mock: (count: number) => import("./mock").Mock;
    shallowEqual: <T extends import("./shallowEqual").Indexable>(prev: T, current: T) => boolean;
    hexToRgbaToHex: (hex: string, a?: string | number) => string;
    getNodeStyleByTheme: (inputNodeTheme: import("../theme").NodeTheme) => {
        type: string;
        style: {
            keyshape: {
                size: number;
                fill: string;
                fillOpacity: number;
                stroke: string;
                strokeOpacity: number;
                lineWidth: number;
                opacity: number;
                type: string;
            };
            label: {
                position: string;
                value: string;
                fill: string;
                fontSize: number;
                offset: number;
                background: undefined;
                fillOpacity: number;
            };
            icon: {
                type: string;
                value: string;
                size: number;
                fill: string;
                fillOpacity: number;
                offset: number[];
            };
            badges: never[];
            halo: {
                visible: boolean;
                fillOpacity: number;
            };
        };
        status: {
            normal: {};
            selected: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                };
            };
            hover: {
                halo: {
                    visible: boolean;
                };
            };
            active: {};
            inactive: {
                keyshape: {
                    fillOpacity: number;
                    strokeOpacity: number;
                };
                icon: {
                    fillOpacity: number;
                };
                label: {
                    fillOpacity: number;
                };
            };
            disabled: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    fill: string;
                    stroke: string;
                };
                icon: {
                    fill: string;
                };
                label: {
                    fill: string;
                };
            };
        };
    };
    getEdgeStyleByTheme: (inputTheme: import("../theme/edge-style").EdgeTheme) => {
        type: string;
        style: {
            keyshape: {
                type: string;
                lineWidth: number;
                stroke: string;
                strokeOpacity: number;
                lineAppendWidth: number;
                cursor: string;
            };
            halo: {
                visible: boolean;
                cursor: string;
                strokeOpacity: number;
            };
            label: {
                value: string;
                position: string;
                fill: string;
                fontSize: number;
                textAlign: string;
            };
            animate: {};
        };
        status: {
            hover: {
                halo: {
                    visible: boolean;
                };
            };
            selected: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                };
                label: {
                    visible: boolean;
                };
            };
            active: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                };
                label: {
                    visible: boolean;
                };
            };
            inactive: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    strokeOpacity: number;
                };
                label: {
                    visible: boolean;
                };
            };
            disabled: {
                halo: {
                    visible: boolean;
                };
                keyshape: {
                    lineWidth: number;
                    stroke: string;
                };
                label: {
                    visible: boolean;
                };
            };
        };
    };
    getComboStyleByTheme: () => {
        type: string;
        style: {
            labelCfg: {
                position: string;
            };
        };
        status: {};
    };
    deepMix: (rst: any, ...args: any[]) => any;
    cloneDeep: typeof cloneDeep;
    uuid: () => string;
    walk: (node: import("..").GraphinTreeData, callback: (node: import("..").GraphinTreeData) => void) => void;
    processEdges: (edges: import("..").IUserEdge[], { poly, loop, }?: {
        poly: number;
        loop: number;
    }) => import("..").IUserEdge[];
    layouts: import("../layout/utils/options").Layouts;
    uniqBy: (arr: any[], fn: (a: any, b: any) => boolean) => any;
};
export default _default;