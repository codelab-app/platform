import deepmerge from 'deepmerge'

/**
 *  Deep merges a list of props together, the latter props have priority over the prior ones in case of conflict
 * The following edge cases are handled:
 * - Merging className strings together
 */
export const mergeProps = (
  ...props: Array<Record<string, any> | null | undefined>
) => {
  return props.reduce<Record<string, any>>((aggregate, nextProps) => {
    if (!nextProps) {
      return aggregate
    }

    return {
      ...deepmerge(aggregate, nextProps),
      className: `${aggregate.className ?? ''} ${nextProps.className ?? ''}`,
    }
  }, {})
}
