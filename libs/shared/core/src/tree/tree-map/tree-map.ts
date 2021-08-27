import { BaseNode } from '@codelab/shared/abstract/core'
import { omit } from 'lodash'
import { hasChildren } from '../has-children'

export const treeMap =
  <P1 extends BaseNode<P1>, P2 extends BaseNode<P2> = any>(
    mapFn: (node: P1) => P2,
    srcChildrenKey = 'children',
    targetChildrenKey = 'children',
  ) =>
  (node: P1): P2 => {
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
