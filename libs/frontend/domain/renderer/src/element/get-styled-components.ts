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

  return ReactComponent
}

export const jsonStringToCss = (json: string | null | undefined) => {
  const jsonObject = JSON.parse(json ?? '{}')
  let css = ''

  for (const key in jsonObject) {
    css += `${key}: ${jsonObject[key]};`
  }

  return css
}
