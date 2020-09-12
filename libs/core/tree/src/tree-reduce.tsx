import { hasChildren, HasChildren } from '@codelab/shared/interface/node'

export const treeReduce = <T extends HasChildren<T>, R>(
  childrenKey = 'children',
  reducerFn: Function,
) => (init: R, node: T) => {
  const acc = reducerFn(init, node)

  if (!hasChildren(node, childrenKey)) {
    return acc
  }

  return node[childrenKey]?.reduce(
    treeReduce<HasChildren<T>, R>(childrenKey, reducerFn),
    acc,
  )
}
