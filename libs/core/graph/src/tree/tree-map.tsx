import { omit } from 'lodash'
import { curry } from 'ramda'
import { CurryMap, hasChildren } from '@codelab/shared/interface/node'

export function treeMap<P1 extends object = {}, P2 extends object = P1>(
  srcChildrenKey = 'children',
  targetChildrenKey = 'children',
) {
  return curry<CurryMap<P1, P2>>(
    (mapFn: (node: P1) => P2, node: P1): P2 => {
      const newNode = mapFn(node)

      if (!hasChildren(node, srcChildrenKey)) {
        return newNode
      }

      return {
        // Replace old children key with new one
        ...omit<P2>(newNode, [srcChildrenKey]),
        [targetChildrenKey]: node[srcChildrenKey]?.map(
          treeMap<P1>(srcChildrenKey, targetChildrenKey)(mapFn as any),
        ),
      } as P2
    },
  )
}
