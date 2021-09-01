import { BaseNode } from '@codelab/shared/abstract/core'

export const hasChildren = <T extends BaseNode<T>>(
  node: T,
  childrenKey = 'children',
) =>
  typeof node === 'object' &&
  typeof node[childrenKey] !== 'undefined' &&
  node[childrenKey]?.length > 0
