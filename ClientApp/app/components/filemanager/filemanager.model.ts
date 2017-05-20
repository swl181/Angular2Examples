export interface ITreeNode {
    id: number;
    label: string;
    children: Array<ITreeNode>;
    isLeaf: boolean,
    isExpanded?: boolean
}