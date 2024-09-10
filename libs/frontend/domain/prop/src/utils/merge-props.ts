import type { IPropData } from '@codelab/shared/abstract/core'
import {
  filter,
  isTruthy,
  map,
  merge,
  omit,
  pick,
  pipe,
  prop,
  reduce,
} from 'remeda'

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
  const classNameOverride = pipe(
    props,
    reduce(
      (acc, { className }) => ({
        className: 'className' in acc ? `${acc.className} ${className}` : '',
      }),
      {},
    ),
  )

  /**
   * Deep merge all props together, later props override earlier ones
   */
  const allProps: IPropData = reduce(props, (acc, curr) => merge(acc, curr), {})

  /**
   * Override the `className` prop with the concatenated version
   */
  return merge(allProps, classNameOverride) as T
}
