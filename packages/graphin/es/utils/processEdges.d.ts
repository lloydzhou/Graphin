import { IUserEdge } from '../typings/type';
/**
 *
 * @param edges 边的集合
 * @param {poly,loop} 设置多边和自环多边的distance
 */
declare const processEdges: (edges: IUserEdge[], { poly, loop, }?: {
    /** poly distance */
    poly: number;
    /** loop distance */
    loop: number;
}) => IUserEdge[];
export default processEdges;
