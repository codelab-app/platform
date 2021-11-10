import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { builderSelectors } from './builderState'

/**
 * Provides a callback that takes in a search input value and a target element id
 * and returns prop key completions based on the last rendered props of that element
 * If the element hasn't been rendered it returns an empty array
 * It returns nested keys in format parsable by lodash.get method, like 'data.item' or 'data.items[0].something'
 */
export const usePropCompletion = () => {
  const lastRenderedProps = useSelector(builderSelectors.lastRenderedProps)

  const providePropCompletion = useCallback(
    (value, elementId: string) => {
      if (!lastRenderedProps || !lastRenderedProps[elementId]) {
        return []
      }

      const keys: Array<string> = []
      const visited: Array<any> = []

      const visitProp = (prop: any, key: string) => {
        if (!prop) {
          return
        }

        if (key.startsWith('_')) {
          return
        }

        if (visited.includes(prop)) {
          return
        }

        visited.push(prop)
        keys.push(key)

        if (key.startsWith('_') || key === 'children') {
          return
        }

        if (Array.isArray(prop)) {
          for (let i = 0; i < prop.length; i++) {
            visitProp(prop[i], `${key}[${i}]`)
          }
        }

        if (typeof prop === 'object') {
          for (const innerKey in prop) {
            visitProp(prop[innerKey], `${key}.${innerKey}`)
          }
        }
      }

      for (const propKey in lastRenderedProps[elementId]) {
        if (
          propKey.toLowerCase().startsWith(value.toLowerCase()) &&
          lastRenderedProps[elementId]
        ) {
          visitProp(lastRenderedProps[elementId]?.[propKey], propKey)
        }
      }

      return keys
    },
    [lastRenderedProps],
  )

  return {
    providePropCompletion,
  }
}
