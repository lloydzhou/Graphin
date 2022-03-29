import { Graph } from '@antv/g6';
import { GraphinData as Data, IUserNode as NodeType } from '../../typings/type';
import { Edge, Node } from './Elements';
import Point from './Point';
import Spring from './Spring';
import Vector from './Vector';
declare type ForceNodeType = Node;
declare type ForceEdgeType = Edge;
interface CentripetalOptions {
    /** 叶子节点的施加力的因子 */
    leaf?: number | ((node: NodeType, nodes: NodeType[], edges: Edge[]) => number);
    /** 孤立节点的施加力的因子 */
    single?: number | ((node: NodeType) => number);
    /** 其他节点的施加力的因子 */
    others?: number | ((node: NodeType) => number);
    /** 向心力的中心点，默认为画布的中心 */
    center?: (node: NodeType, nodes: NodeType[], edges: Edge[], width: number, height: number) => {
        x: number;
        y: number;
        centerStrength?: number;
    };
}
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value: V): this;
    readonly size: number;
}
export interface ForceProps {
    /** 向心力 */
    centripetalOptions: CentripetalOptions;
    /** 是否需要叶子节点聚类 */
    leafCluster: boolean;
    /** 是否需要全部节点聚类 */
    clustering: boolean;
    /** 节点聚类的映射字段 */
    nodeClusterBy: string;
    /** 节点聚类作用力系数 */
    clusterNodeStrength: number | ((node: NodeType) => number);
    /** spring stiffness 弹簧劲度系数 */
    stiffness: number;
    /** 默认的弹簧长度 */
    defSpringLen: (edge: Edge, source: Point, target: Point) => number;
    /** repulsion 斥力，这里指代 库伦常量Ke */
    repulsion: number;
    /** https://www.khanacademy.org/science/ap-physics-1/ap-electric-charge-electric-force-and-voltage/coulombs-law-and-electric-force-ap/a/coulombs-law-and-electric-force-ap-physics-1 */
    /** volocity damping factor 速度的减震因子，其实就是阻尼系数 */
    damping: number;
    /** 最小能量阈值，当粒子运动，有阻尼系数的存在，最终会将初始的能量消耗殆尽,默认0.1, */
    minEnergyThreshold: number;
    /**  最大的速度 ？[0,1000]的加速度 */
    maxSpeed: number;
    /** default Coulombs Constant 默认0.005 */
    coulombDisScale: number;
    /** default time, used in velocity, acceleration and position's updating */
    tickInterval: number;
    groupFactor: number;
    maxIterations: number;
    /** 最小位移阈值，小于阈值则会停止迭代，默认0.5 */
    minDistanceThreshold: number;
    /** 阈值的使用条件，mean 代表平均移动距离小于 minDistanceThreshold 时停止迭代，max 代表最大移动距离大时 minDistanceThreshold 时停时迭代。默认为 mean */
    distanceThresholdMode: 'mean' | 'max' | 'min';
    /** 初始化时候是否需要动画 */
    animation: boolean;
    /** 是否启动webworker */
    enableWorker: boolean;
    /** 重启后是否需要动画 */
    restartAnimation: boolean;
    /** 力导区域的宽度 */
    width: number;
    /** 力导区域的高度 */
    height: number;
    /**  力导结束后的回调函数 */
    done?: (nodes: NodeType[]) => void;
    /** 忽略节点，不参加力导计算 */
    ignore?: (node: NodeType) => boolean;
}
interface IndexableProp extends ForceProps {
    [key: string]: ForceProps[keyof ForceProps];
}
declare class ForceLayout {
    props: IndexableProp;
    sourceData: Data;
    nodes: ForceNodeType[];
    edges: ForceEdgeType[];
    nodeSet: {
        [key: string]: Node;
    };
    edgeSet: {
        [key: string]: Edge;
    };
    renderNodes: NodeType[];
    nodePoints: Map<string, Point>;
    edgeSprings: Map<string, Spring>;
    registers: Map<string, (params: any) => any>;
    done: boolean;
    iterations: number;
    nextEdgeId: number;
    timer: number;
    /** 向心力的中心点 */
    center: Vector;
    /** 与 minDistanceThreshold 进行对比的判断停止迭代节点移动距离 */
    judgingDistance: number;
    centripetalOptions: CentripetalOptions;
    /** 被拖动过的节点 */
    dragNodes: ForceNodeType[];
    constructor(options: Partial<ForceProps>);
    /**
     * Iterate options to update this.props
     * @param {*} options
     */
    updateOptions: (options: Partial<IndexableProp>) => void;
    setData: (data: Data) => void;
    getMass: (node: NodeType) => number;
    init: () => void;
    start: () => void;
    calTotalEnergy: () => number;
    slienceForce: () => void;
    /** polyfill: support webworker requestAnimationFrame */
    requestAnimationFrame: (fn: any) => any;
    cancelAnimationFrame: (handleId: number) => void;
    animation: () => void;
    render: () => void;
    reportMointor: (energy: number) => {
        energy: number;
        iterations: number;
        nodes: Node[];
        edges: Edge[];
    };
    tick: (interval: number) => void;
    /** 布局算法 */
    updateCoulombsLawOptimized: () => void;
    updateCoulombsLaw: () => void;
    updateHookesLaw: () => void;
    attractToCentre: () => void;
    updateVelocity: (interval: number) => void;
    updatePosition: (interval: number) => void;
    /**
     * add one Node
     * @param {[type]} node [description]
     */
    addNode: (node: ForceNodeType) => void;
    /**
     * add Nodes
     * @param {[type]} data [description]
     */
    addNodes: (data: NodeType[]) => void;
    /**
     * add one Edge
     * @param {[type]} edge [description]
     */
    addEdge: (edge: Edge) => Edge;
    /**
     * add Edges
     * @param {[type]} data [description]
     */
    addEdges: (data: Edge[]) => void;
    register: (type: string, options: any) => void;
    restart: (dragNodes: ForceNodeType[], graph: Graph) => void;
    stop: () => void;
}
export default ForceLayout;
