import Graphin from './Graphin';
import GraphinContext, { GraphinContextType } from './GraphinContext';
import Utils from './utils';
import Behaviors from './behaviors';
/** export type */
export { NodeStyle, EdgeStyle, GraphinData, GraphinTreeData, IUserEdge, IUserNode, Layout } from './typings/type';
export { ThemeType } from './theme';
export { GraphinContextType };
/** 解构静态方法 */
declare const registerFontFamily: typeof Graphin.registerFontFamily;
/** export */
export default Graphin;
export { Utils, GraphinContext, Behaviors, registerFontFamily };
export { 
/** export G6 */
default as G6, 
/** export G6 Type  */
Graph, IG6GraphEvent, GraphData, TreeGraphData, NodeConfig, EdgeConfig, } from '@antv/g6';
export interface GraphEvent extends MouseEvent {
    item: any;
    target: any;
}
