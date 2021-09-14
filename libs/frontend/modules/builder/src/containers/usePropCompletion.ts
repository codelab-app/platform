import { useCallback } from 'react'
import { useBuilderCurrentProps } from './builderState'

export const usePropCompletion = () => {
  const currentProps = useBuilderCurrentProps()

  const providePropCompletion = useCallback(
    (value, elementId: string) => {
      if (!currentProps || !currentProps[elementId]) {
        return []
      }

      const keys: Array<string> = []
      const visited: Array<any> = []

      const visitProp = (prop: any, key: string) => {
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
