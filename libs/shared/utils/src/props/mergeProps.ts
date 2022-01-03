import { IPropData } from '@codelab/shared/abstract/core'
import { MaybeOrNullable } from '@codelab/shared/abstract/types'
import { mergeWith } from 'lodash'

type PropsArray = Array<MaybeOrNullable<IPropData>>

const propsCustomizer = (value: any, srcValue: any, key: string) => {
  if (key === 'className') {
    return `${value || ''} ${srcValue || ''}`
  }

  if (key.toLowerCase().endsWith('ref')) {
    return value || srcValue // keep the value, don't want to clone refs
  }

  if (key === '__node') {
    return value || srcValue
  }

  return undefined
}

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 * - Merging className strings together
 */

export const mergeProps = (...propsArray: PropsArray): IPropData => {
  return propsArray.reduce<IPropData>((mergedProps, nextProps) => {
    return mergeWith(mergedProps, nextProps, propsCustomizer)
  }, {})
}
