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
import { NodeEntity } from '@codelab/core/node'
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
    subTreeAcc: S, // prev (reduce arg)
    child: T, // curr (reduce arg)
    index: number, // index (reduce arg)
  ): any => {
    if (parent && !parent?.id) {
      throw Error('id missing from parent')
    }

    /**
     * Append parent with acc
     */
    const newSubTreeAcc: S = nodeIteratee(
      { ...subTreeAcc, parent },
      child,
      index,
    )

    /**
     * Return traversal if no more children
     */
    if (!NodeEntity.hasChildren<T>(child)) {
      return newSubTreeAcc
    }

    const newParent = newSubTreeAcc.prev

    /**
     * At junction of tree, call children recursively with new parent & context passed in
     */
    return reduce<T, S>(
      ((child?.children ?? []) as Array<T>) ?? [],
      treeWalker<T, S>(newParent, nodeIteratee),
      newSubTreeAcc,
    )
  }
}

export const traversePostOrder = <T extends NodeDtoA>(
  node: T,
  iteratee: TraversalIteratee<T>,
) => {
  node.children.forEach((child) => {
    traversePostOrder<T>(child as T, iteratee)
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
