import {
  IElementRef,
  IPropData,
  IRenderer,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import isObjectLike from 'lodash/isObjectLike'

/**
 * Provides a callback that takes in a search input value and a target element id
 * and returns prop key completions based on the last rendered props of that element
 * If the element hasn't been rendered it returns an empty array
 * It returns nested keys in format parsable by lodash.get method, like 'data.item' or 'data.items[0].something'
 */
export const usePropCompletion = (renderService: IRenderer) => {
  const providePropCompletion = (value: string, elementId: IElementRef) => {
    const element = renderService.pageTree?.current.element(elementId)

    if (!element) {
      return []
    }

    const renderOutput = renderService.renderIntermediateElement(element)

    if (!renderOutput) {
      return []
    }

    const allRenderedProps = Array.isArray(renderOutput)
      ? renderOutput
          .map((r) => r.props)
          .reduce((acc, next) => mergeProps(acc, next), {} as IPropData)
      : renderOutput.props

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

      if (isObjectLike(prop)) {
        for (const innerKey in prop) {
          visitProp(prop[innerKey], `${key}.${innerKey}`)
        }
      }
    }

    for (const propKey in allRenderedProps) {
      if (propKey.toLowerCase().startsWith(value.toLowerCase())) {
        visitProp(allRenderedProps[propKey], propKey)
      }
    }

    return keys
  }

  return {
    providePropCompletion,
  }
}
