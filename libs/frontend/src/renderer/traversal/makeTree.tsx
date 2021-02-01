import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'
import { NodeEntity } from './NodeEntity'
import { treeWalker } from './traversal'
import { TreeSubTreeAcc } from './traversal-types'

export const makeTree = (data: NodeA): NodeA => {
  const tree = new NodeEntity(data)

  treeWalker<NodeA, TreeSubTreeAcc<NodeA>>(treeAppenderIteratee, tree)(
    {},
    // Error arises when json data doesn't have id to check for root equality, we set the root id on the JSON so we can compare in the iteratee
    { ...data, id: tree.id },
  )

  return tree
}
