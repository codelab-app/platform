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
import { Node } from '@codelab/core/node'
import { TraversalIteratee } from '@codelab/shared/interface/graph'
import { NodeDtoA, NodeDtoI } from '@codelab/shared/interface/node'
import { NodeIteratee, TreeSubTreeAcc } from '@codelab/shared/interface/tree'

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
export const treeWalker = <T extends NodeDtoI, S extends TreeSubTreeAcc<T>>(
  parent: T | undefined,
  nodeIteratee: NodeIteratee<S, T>,
) => {
  return (
    subTreeContext: S, // prev (reduce arg)
    child: T, // curr (reduce arg)
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

    if (!Node.hasChildren<T>(child)) {
      return newSubTreeContext
    }

    // At junctions of tree, returns when all children appended
    return reduce<T, S>(
      ((child?.children ?? []) as Array<T>) ?? [],
      treeWalker<T, S>(newSubTreeContext.prev, nodeIteratee),
      newSubTreeContext,
    )
  }
}

export const traversePostOrder = (
  node: NodeDtoA,
  iteratee: TraversalIteratee,
) => {
  node.children.forEach((child) => {
    traversePostOrder(child, iteratee)
  })

  iteratee(node)
}

export const traversePreOrder = (
  node: NodeDtoA,
  iteratee: TraversalIteratee,
) => {
  if (!node) {
    return
  }

  iteratee(node)

  node.children.forEach((child) => {
    traversePreOrder(child, iteratee)
  })
}
