import flow from 'lodash/flow'
import fromPairs from 'lodash/fromPairs'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import mapValues from 'lodash/mapValues'
import sortBy from 'lodash/sortBy'
import toPairs from 'lodash/toPairs'

export const deepSortKeys = <T>(obj: T): T => {
  if (isArray(obj)) {
    return obj.map(deepSortKeys) as T
  } else if (isObject(obj)) {
    const sortAndMap = flow([
      toPairs,
      (pairs) => sortBy(pairs, 0),
      fromPairs,
      (sortedObj) => mapValues(sortedObj, deepSortKeys),
    ])

    return sortAndMap(obj) as T
  }

  return obj
}
