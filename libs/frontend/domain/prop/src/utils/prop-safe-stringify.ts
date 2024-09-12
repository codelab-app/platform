/* eslint-disable @typescript-eslint/ban-types */
import type { IPropData } from '@codelab/shared/abstract/core'
import { isValidElement } from 'react'
import {
  isArray,
  isFunction,
  isObjectType,
  isPlainObject,
  pickBy,
} from 'remeda'

export const propSafeStringify = (props: IPropData, maskFunctions = true) => {
  const obj = pickBy(props, (value, key) => !key.startsWith('_'))
  const cache = new WeakMap<object, boolean>()

  const replacer = (key: string, value: object) => {
    // handle ReactNodeType
    if (isValidElement(value)) {
      return 'React element'
    }

    if (isObjectType(value)) {
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
