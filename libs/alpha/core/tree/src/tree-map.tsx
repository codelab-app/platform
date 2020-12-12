import { omit } from 'lodash'
import { HasChildren, hasChildren } from '@codelab/alpha/shared/interface/node'

export const treeMap = <
  P1 extends HasChildren<P1>,
  P2 extends HasChildren<P2> = any
>(
  mapFn: (node: P1) => P2,
  srcChildrenKey = 'children',
  targetChildrenKey = 'children',
) => (node: P1): P2 => {
  const newNode = mapFn(node)

  if (!hasChildren(node, srcChildrenKey)) {
    return newNode
  }

  return {
    // Replace old children key with new one
    ...omit<P2>(newNode, [srcChildrenKey]),
    [targetChildrenKey]: node[srcChildrenKey]?.map(
      treeMap<P1>(mapFn as any, srcChildrenKey, targetChildrenKey),
    ),
  } as P2
}
