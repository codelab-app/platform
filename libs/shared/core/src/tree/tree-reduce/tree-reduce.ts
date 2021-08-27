import { BaseNode } from '@codelab/shared/abstract/core'
import { hasChildren } from '../has-children'

export const treeReduce =
  <T extends BaseNode<T>, R>(
    reducerFn: (...args: any) => any,
    childrenKey = 'children',
  ) =>
  (init: R, node: T) => {
    const acc = reducerFn(init, node)

    if (!hasChildren(node, childrenKey)) {
      return acc
    }

    return node[childrenKey]?.reduce(
      treeReduce<BaseNode<T>, R>(reducerFn, childrenKey),
      acc,
    )
  }
