import type { IPropData } from '@codelab/shared-abstract-core'

import { filter, isTruthy, mergeDeep, omit } from 'remeda'

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 *
 * The following edge cases are handled:
 *
 * - Merging className strings together
 *
 * Remove nullish to make usage more clear, we can see which ones are nullable when we use `mergeProps(x, y ?? {})`
 */

export const mergeProps = <T extends IPropData>(
  propsItem: T,
  ...propsList: Array<IPropData>
) => {
  const props = filter([propsItem, ...propsList], isTruthy)

  /**
   * Combine all `className` into a single concatenated version
   */
  return props.reduce((acc, cur) => {
    /**
     * Transform `className` if exists in current
     */
    if ('className' in cur) {
      acc['className'] = acc['className']
        ? `${acc['className']} ${cur['className']}`
        : cur['className']
    }

    /**
     * Merge all props except className, since we already set earlier
     */
    return mergeDeep(acc, omit(cur, ['className']))
  }, {} as { className?: string }) as T
}
