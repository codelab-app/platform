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
// eslint-disable-next-line import/no-cycle
import { NodeEntity } from '@codelab/core/node'
import { NodeA, NodeI } from '@codelab/shared/interface/node'
import {
  NodeIteratee,
  TraversalIteratee,
  TreeSubTreeAcc,
} from '@codelab/shared/interface/tree'

/**
 * Function should traverse each node, then apply a callback function with arguments passed from the reducer
 *
 * @param nodeIteratee
 * @param parent
 */
export const treeWalker = <
  T extends NodeI = NodeI,
  S extends TreeSubTreeAcc<T> = TreeSubTreeAcc<T>
>(
  nodeIteratee: TraversalIteratee<S, T>,
  parent?: T,
) => {
  return (
    tree: S, // prev acc (reduce arg)
    child: T, // curr (reduce arg)
  ) => {
    /**
     * Append parent with acc
     */
    const newTree: S = nodeIteratee({ ...tree, parent }, child)

    /**
     * Return traversal if no more children
     */
    if (!NodeEntity.hasChildren<T>(child)) {
      return newTree
    }

    const newParent = newTree.prev

    /**
     * At junction of tree, call children recursively with new parent & context passed in
     */
    return reduce<T, S>(
      child.children as Array<T>,
      treeWalker<T, S>(nodeIteratee, newParent),
      newTree,
    )
  }
}

export const traversePostOrder = (node: NodeA, iteratee: NodeIteratee) => {
  node.children.forEach((child) => {
    traversePostOrder(child, iteratee)
  })

  iteratee(node)
}

export const traversePreOrder = (node: NodeA, iteratee: NodeIteratee) => {
  if (!node) {
    return
  }

  iteratee(node)

  node.children.forEach((child) => {
    traversePreOrder(child, iteratee)
  })
}
