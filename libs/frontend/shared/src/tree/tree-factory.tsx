import { Nodes } from '../interfaces/ComponentElementNode'
import { treeAppenderIteratee } from './tree-iteratee'
import { TreeNode } from './tree-node'
import { TreeSubTreeAcc, treeWalker } from './tree-walker'

export const makeTree = (data: Nodes): Nodes => {
  const tree = new TreeNode(data)

  treeWalker<Nodes, TreeSubTreeAcc<Nodes>>(treeAppenderIteratee, tree)(
    {},
    // Error arises when json data doesn't have id to check for root equality, we set the root id on the JSON so we can compare in the iteratee
    { ...data, id: tree.id },
  )

  return tree
}
