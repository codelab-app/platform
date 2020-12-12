import { HasChildren, hasChildren } from '@codelab/alpha/shared/interface/node'

export const treeReduce = <T extends HasChildren<T>, R>(
  reducerFn: Function,
  childrenKey = 'children',
) => (init: R, node: T) => {
  const acc = reducerFn(init, node)

  if (!hasChildren(node, childrenKey)) {
    return acc
  }

  return node[childrenKey]?.reduce(
    treeReduce<HasChildren<T>, R>(reducerFn, childrenKey),
    acc,
  )
}
