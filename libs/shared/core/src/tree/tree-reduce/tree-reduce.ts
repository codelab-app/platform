import { IBaseNode } from '@codelab/shared/abstract/core'
import { hasChildren } from '../has-children'

export const treeReduce =
  <T extends IBaseNode<T>, R>(
    reducerFn: (...args: any) => any,
    childrenKey = 'children',
  ) =>
  (init: R, node: T) => {
    const acc = reducerFn(init, node)

    if (!hasChildren(node, childrenKey)) {
      return acc
    }

    return node[childrenKey]?.reduce(
      treeReduce<IBaseNode<T>, R>(reducerFn, childrenKey),
      acc,
    )
  }
