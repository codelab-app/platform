/**
 * treeWalker passes in a new parent at each level
 */

import { NodeA } from '../interfaces/NodeA'
import { TreeNode } from './tree-node'
import { TraversalIteratee, TreeSubTreeAcc } from './tree-walker'

export const treeAppenderIteratee: TraversalIteratee<
  TreeNode,
  TreeSubTreeAcc<TreeNode>
> = ({ parent }: TreeSubTreeAcc<TreeNode>, child: NodeA) => {
  /**
   * Since we removed passing children into treeWalker from tree-factory, or the initial call to treeWalker, the parent & the child are the same for the first pass.
   *
   * We simply return here and wait for treeWalker to call itself with the children passed in.
   *
   * You can think of the first iteratee as a noop, we simply are waiting for the recursive call.
   *
   * */
  if (parent?.id === child.id) {
    return {
      prev: parent,
    }
  }

  const node = new TreeNode(child)

  if (parent) {
    parent.addChild(node)
  }

  return {
    prev: node,
  }
}
