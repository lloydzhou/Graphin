export interface DragNodeWithForceProps {
    /**
     * @description 被拖拽的节点，是否自动固定住
     * @description.en-US Whether the dragged node is automatically fixed
     * @default false
     */
    autoPin?: boolean;
    dragNodeMass?: number;
}
declare const DragNodeWithForce: (props: DragNodeWithForceProps) => null;
export default DragNodeWithForce;
