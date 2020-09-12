/**
 * There are 3 types of traversal orders for a Tree data structure:
 *
 * (1) In-order
 * (2) Pre-order
 * (3) Post-order
 *
 * For building a DOM from React components, we want to use post-order. Check `Traversal.spec.ts` for an example.
 */

import { reduce } from 'lodash'
import { NodeIteratee, TreeSubTreeAcc } from '@codelab/shared/interface/tree'
import { TraversalIteratee } from '@codelab/shared/interface/graph'
import { Node } from '@codelab/core/node'

/**
 * Curried function allows us to first initialize the treeWalker with an iteratee.
 *
 * The reduce loop then passes the remaining arguments.
 *
 * @param parent - Parent `Node` of current iteratee
 */
// P -> Prop
// S -> SubTree or Acc
// N -> Node
export const treeWalker = <S extends TreeSubTreeAcc<Node>>(
  parent: Node | undefined,
  nodeIteratee: NodeIteratee<S, Node>,
) => {
  return (
    subTreeContext: S, // prev (reduce arg)
    child: Node, // curr (reduce arg)
    index: number, // index (reduce arg)
  ): any => {
    if (parent && !parent?.id) {
      throw Error('id missing from parent')
    }

    const newSubTreeContext: S = nodeIteratee(
      { ...subTreeContext, parent },
      child,
      index,
    )

    if (!Node.hasChildren<Node>(child)) {
      return newSubTreeContext
    }

    // At junctions of tree, returns when all children appended
    return reduce<Node, S>(
      child.children,
      treeWalker<S>(newSubTreeContext.prev, nodeIteratee),
      newSubTreeContext,
    )
  }
}

export const traversePostOrder = (node: Node, iteratee: TraversalIteratee) => {
  node.children.forEach((child) => {
    traversePostOrder(child, iteratee)
  })

  iteratee(node)
}

export const traversePreOrder = (node: Node, iteratee: TraversalIteratee) => {
  if (!node) {
    return
  }

  iteratee(node)

  node.children.forEach((child) => {
    traversePreOrder(child, iteratee)
  })
}
