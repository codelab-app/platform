import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import isObjectLike from 'lodash/isObjectLike'
import pickBy from 'lodash/pickBy'

export const filterEmptyStrings = (data: unknown): unknown =>
  isObject(data)
    ? pickBy(data, (value: unknown, key) => {
        if (isArray(value)) {
          return value.map(filterEmptyStrings)
        }

        if (isObjectLike(value)) {
          return filterEmptyStrings(value)
        }

        return value !== ''
      })
    : data
