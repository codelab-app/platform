import { useCallback } from 'react'
import { useBuilderCurrentProps } from './builderState'

export const usePropCompletion = () => {
  const currentProps = useBuilderCurrentProps()

  const providePropCompletion = useCallback(
    (value, elementId: string) => {
      if (!value || !currentProps || !currentProps[elementId]) {
        return []
      }

      const keys: Array<string> = []
      const visited = new Set()

      const visitProp = (prop: any, key: string) => {
        if (visited.has(key)) {
          return
        }

        visited.add(key)
        keys.push(key)

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

      for (const propKey in currentProps[elementId]) {
        if (propKey.toLowerCase().startsWith(value.toLowerCase())) {
          visitProp(currentProps[elementId][propKey], propKey)
        }
      }

      return keys
    },
    [currentProps],
  )

  return {
    providePropCompletion,
  }
}
