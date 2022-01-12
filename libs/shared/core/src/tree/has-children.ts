import { IBaseNode } from '@codelab/shared/abstract/core'
import { isFunction, isUndefined } from 'lodash'

export const hasChildren = <T extends IBaseNode<T>>(
  node: T,
  childrenKey = 'children',
) =>
  isFunction(node) &&
  !isUndefined(node[childrenKey]) &&
  node[childrenKey]?.length > 0
