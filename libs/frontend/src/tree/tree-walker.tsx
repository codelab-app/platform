import { reduce } from 'lodash'
import { NodeA } from '../../../modules/graph/src/core/domain/node/Node'

export interface HasParent<T extends NodeA = NodeA> {
  parent?: T
}

export interface TreeSubTreeAcc<T extends NodeA> extends HasParent<T> {
  prev?: T
  parent?: T
}

export type TraversalIteratee<T extends NodeA, SubTree extends HasParent<T>> = (
  acc: SubTree,
  curr: T,
  index?: number,
) => SubTree

/**
 * Function should traverse each node, then apply a callback function with arguments passed from the reducer
 *
 * @param nodeIteratee
 * @param parent
 */
export const treeWalker = <
  T extends NodeA = NodeA,
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
    if (!child.children?.length) {
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
