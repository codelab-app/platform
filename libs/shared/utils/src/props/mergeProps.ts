import { MaybeOrNullable, Nullable } from '@codelab/shared/abstract/types'

export const mergeTwoPropObjects = (
  propsA?: Nullable<Record<string, any>>,
  propsB?: Nullable<Record<string, any>>,
  aggregate?: Record<string, any>,
): Record<string, any> => {
  if (!aggregate) {
    aggregate = {}
  }

  if (!propsA) {
    if (propsB) {
      return { ...propsB }
    }

    return {}
  }

  if (!propsB) {
    return { ...propsA }
  }

  for (const key of Object.keys(propsB)) {
    const valueA = propsA[key]
    const valueB = propsB[key]

    if (key === 'className') {
      aggregate.className = `${valueA ?? ''} ${valueB ?? ''}`
      continue
    }

    if (key.toLowerCase().endsWith('ref')) {
      if (valueA) {
        aggregate[key] = valueA // keep the valueA, don't want to clone refs
        continue
      } else {
        aggregate[key] = valueB
        continue
      }
    }

    if (key === '__node') {
      aggregate[key] = valueA || valueB
      continue
    }

    if (Array.isArray(valueB)) {
      aggregate[key] = [...valueB]
      continue
    }

    if (Array.isArray(valueA)) {
      // A is array, B is not. Not sure what is right to do here
      aggregate[key] = valueB
      continue
    }

    if (
      typeof valueA === 'object' &&
      typeof valueB === 'object' &&
      valueA &&
      valueB
    ) {
      aggregate[key] = mergeTwoPropObjects(valueA, valueB, aggregate[key])
      continue
    }

    aggregate[key] = valueB
  }

  return aggregate
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
      mergeTwoPropObjects(mergedProps, nextProps, mergedProps),
    {},
  )
}
