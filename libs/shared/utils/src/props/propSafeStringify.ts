import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import isObjectLike from 'lodash/isObjectLike'
import isPlainObject from 'lodash/isPlainObject'
import pickBy from 'lodash/pickBy'
import React from 'react'

export const propSafeStringify = (props: any, maskFunctions = true) => {
  const obj = pickBy(props, (value, key) => !key.startsWith('_'))
  const cache = new WeakMap<any, boolean>()

  const replacer = (key: string, value: any) => {
    if (key === 'children' && isObjectLike(value)) {
      return
    }

    // handle ReactNodeType
    if (React.isValidElement(value)) {
      return 'React element'
    }

    if (isObjectLike(value)) {
      if (!isArray(value) && !isPlainObject(value)) {
        return `${value.constructor.name} instance`
      }

      // Duplicate reference found, discard key
      if (cache.get(value)) {
        return
      }

      // Store value in our collection
      cache.set(value, true)
    }

    if (maskFunctions && isFunction(value)) {
      return 'function'
    }

    return value
  }

  const result = JSON.stringify(obj, replacer, 4)

  return result
}
