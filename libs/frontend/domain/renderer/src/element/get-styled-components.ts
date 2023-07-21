import type { IComponentType } from '@codelab/frontend/abstract/core'
import React from 'react'
import styled from 'styled-components'

/**
 * Only wrap the component with styled() if it's a valid component (not a string or React.Fragment)
 */
export const getStyledComponent = (
  ReactComponent: IComponentType,
  cssString: string | null | undefined,
) => {
  if (
    ReactComponent.$$typeof !== React.Fragment.$$typeof &&
    typeof ReactComponent === 'object' &&
    // Wrap if contains cssString
    cssString
  ) {
    return styled(ReactComponent)`
      ${cssString}
    `
  }

  // styled() uses hooks internally. Therefore, we need to always wrap the component
  // with styled, otherwise the number of hooks will be different between the
  // prev and next render, which will cause errors.
  // This can happen if an element is rendered conditionally (renderIf)
  const Wrapper = (props: React.PropsWithChildren) => {
    // Don't pass props to React.Fragment
    if (ReactComponent === React.Fragment) {
      return React.createElement(ReactComponent, null, props.children)
    }

    return React.createElement(ReactComponent, props, props.children)
  }

  return styled(Wrapper)``
}

export const jsonStringToCss = (json: string | null | undefined) => {
  const jsonObject = JSON.parse(json ?? '{}')
  let css = ''

  for (const key in jsonObject) {
    css += `${key}: ${jsonObject[key]};`
  }

  return css
}
