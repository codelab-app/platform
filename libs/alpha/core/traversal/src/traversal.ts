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
import { NodeEntity } from '@codelab/alpha/core/node'
import { NodeA, NodeI } from '@codelab/alpha/shared/interface/node'
import {
  NodeIteratee,
  TraversalIteratee,
  TreeSubTreeAcc,
} from '@codelab/alpha/shared/interface/tree'

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
  nodeIteratee: TraversalIteratee<T, S>,
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

export const treeWalkerPostOrder = <
  T extends NodeI = NodeI,
  S extends TreeSubTreeAcc<T> = TreeSubTreeAcc<T>
>(
  nodeIteratee: TraversalIteratee<T, S>,
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

/**
 * Need to pass acc in first to keep the acc context for each level, if we don't curry function, the acc will get replaced during each iteration
 *
 * This function is good for using it on a tree, it traverses using postOrder & build your acc.
 *
 * We can't do with tree alone, as tree can't control traversal order.
 */
export const traversePostOrderReducer = (acc: object = {}) => (
  iteratee: any,
  node: NodeI,
) => {
  ;(node.children ?? []).forEach((child) => {
    traversePostOrderReducer(acc)(iteratee, child)
  })

  iteratee(node, acc)

  return acc
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
