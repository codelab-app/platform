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
    return fromPairs(sortBy(toPairs(obj), 0))
      .mapValues(deepSortKeys)
      .value()
  }

  return obj
}
