import { GraphinData, IUserNode, IUserEdge } from '../../typings/type';
declare const tweak: (currentData: GraphinData, prevData: GraphinData) => {
    nodes: IUserNode[];
    edges: IUserEdge[];
    combos?: import("../../typings/type").Combo[] | null | undefined;
};
export default tweak;