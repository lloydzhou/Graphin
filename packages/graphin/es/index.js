import Graphin from './Graphin';
import GraphinContext from './GraphinContext';
import Utils from './utils';
import Behaviors from './behaviors';
import registerGraphinForce from './layout/inner/registerGraphinForce';
import registerPresetLayout from './layout/inner/registerPresetLayout';
import { registerGraphinCircle, registerGraphinLine } from './shape';
/** 注册 Graphin force 布局 */

registerGraphinForce();
/** 注册 Graphin preset 布局 */

registerPresetLayout();
/** 注册 Graphin Circle Node */

registerGraphinCircle();
/** 注册 Graphin line Edge */

registerGraphinLine();
/** 解构静态方法 */

var registerFontFamily = Graphin.registerFontFamily;
/** export */

export default Graphin;
export { Utils, GraphinContext, Behaviors, registerFontFamily };
export {
/** export G6 */
default as G6,
/** export G6 Type  */
Graph } from '@antv/g6';