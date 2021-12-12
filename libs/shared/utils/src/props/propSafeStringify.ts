import isPlainObject from 'lodash/isPlainObject'
import React from 'react'

export const propSafeStringify = (props: any, maskFunctions = true) => {
  const obj: Record<string, any> = {}

  for (const k in props) {
    if (k.startsWith('_')) {
      continue
    }

    obj[k] = props[k]
  }

  const cache = new WeakMap<any, boolean>()

  const result = JSON.stringify(
    obj,
    (k, v) => {
      if (k === 'children' && typeof v === 'object') {
        return
      }

      // handle ReactNodetype
      if (React.isValidElement(v)) {
        return 'React element'
      }

      if (typeof v === 'object' && v !== null) {
        if (!isPlainObject(v)) {
          return `${v.constructor.name} instance`
        }

        // Duplicate reference found, discard key
        if (cache.get(v)) {
          return
        }

        // Store value in our collection
        cache.set(v, true)
      }

      if (maskFunctions && typeof v === 'function') {
        return 'function'
      }

      return v
    },
    4,
  )

  return result
}
