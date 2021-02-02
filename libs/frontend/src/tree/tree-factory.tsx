import { treeAppenderIteratee } from './tree-iteratee'
import { TreeNode } from './tree-node'
import { TreeSubTreeAcc, treeWalker } from './tree-walker'
import { NodeA } from 'libs/modules/graph/src/core/domain/node/Node'

export const makeTree = (data: NodeA): NodeA => {
  const tree = new TreeNode(data)

  treeWalker<NodeA, TreeSubTreeAcc<NodeA>>(treeAppenderIteratee, tree)(
    {},
    // Error arises when json data doesn't have id to check for root equality, we set the root id on the JSON so we can compare in the iteratee
    { ...data, id: tree.id },
  )

  return tree
}
