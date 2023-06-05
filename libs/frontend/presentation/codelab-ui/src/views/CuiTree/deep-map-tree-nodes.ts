type TreeNode<T> = T & {
  children?: Array<TreeNode<T>>
}

export const deepMapTreeNodes = <T>(
  tree: TreeNode<T>,
  callback: (node: TreeNode<T>) => TreeNode<T>,
): TreeNode<T> => {
  return {
    ...callback(tree),
    children: tree.children
      ? tree.children.map((child) => deepMapTreeNodes(child, callback))
      : undefined,
  }
}
