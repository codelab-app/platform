import { IBaseNode } from '@codelab/shared/abstract/core'
import { isObject, isUndefined } from 'lodash'

export const hasChildren = <T extends IBaseNode<T>>(
  node: T,
  childrenKey = 'children',
) =>
  isObject(node) &&
  !isUndefined(node[childrenKey]) &&
  node[childrenKey]?.length > 0
