import { IBaseNode } from '@codelab/shared/abstract/core'

export const hasChildren = <T extends IBaseNode<T>>(
  node: T,
  childrenKey = 'children',
) =>
  typeof node === 'object' &&
  typeof node[childrenKey] !== 'undefined' &&
  node[childrenKey]?.length > 0
