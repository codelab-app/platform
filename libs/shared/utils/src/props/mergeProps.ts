import type { IPropData } from '@codelab/frontend/abstract/core'
import mergeWith from 'lodash/mergeWith'

type PropsArray = Array<IPropData | null | undefined>

const propsCustomizer = (value: string, srcValue: string, key: string) => {
  if (key === 'className') {
    return `${value || ''} ${srcValue || ''}`
  }

  return undefined
}

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 *
 * - Merging className strings together
 */

export const mergeProps = <TData extends IPropData = IPropData>(
  ...propsArray: PropsArray
): TData => {
  return propsArray.reduce<TData>((mergedProps, nextProps) => {
    return mergeWith(mergedProps, nextProps, propsCustomizer)
  }, {} as TData)
}
