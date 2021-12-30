import { MaybeOrNullable } from '@codelab/shared/abstract/types'
import { mergeWith } from 'lodash'

export const mergeTwoPropObjects = (value: any, srcValue: any, key: string) => {
  if (key === 'className') {
    const classList = value ? value.split(' ') : []
    classList.push(srcValue)

    return classList.join(' ')
  }

  return undefined
}

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 * - Merging className strings together
 */
export const mergeProps = (
  ...propArray: Array<MaybeOrNullable<Record<string, any>>>
): Record<string, any> => {
  return propArray.reduce<Record<string, any>>(
    (mergedProps, nextProps) =>
      mergeWith(mergedProps, nextProps, mergeTwoPropObjects),
    {},
  )
}
