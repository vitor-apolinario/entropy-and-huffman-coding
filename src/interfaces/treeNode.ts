interface TreeNode {
  symbol: string;
  isLeaf: boolean;
  frequency: number;
  left: TreeNode;
  right: TreeNode;
}

export default TreeNode;