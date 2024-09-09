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
 * The following edge cases are handled:
 *
 * - Merging className strings together
 */

export const mergeProps = <TData extends IPropData = IPropData>(
  ...propsArray: Array<TData | null | undefined>
) => {
  const props = filter(propsArray, isTruthy)

  /**
   * Combine all `className` into a single concatenated version
   */
  const classNameOverride = pipe(
    props,
    reduce(
      (acc, { className }) => ({
        className: `${acc.className} ${className}`,
      }),
      { className: '' },
    ),
  )

  const restProps = reduce(props, (acc, curr) => merge(acc, curr), {})

  /**
   * Override the `className` prop with the concatenated version
   */
  return merge(restProps, classNameOverride)
}
