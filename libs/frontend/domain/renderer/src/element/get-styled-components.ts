import type { IComponentType, IPropData } from '@codelab/frontend/abstract/core'
import { camelCaseToKebabCaseOnlyKeys } from '@codelab/shared/utils'
import React from 'react'
import styled from 'styled-components'

const ReusableStyledComponent = styled('placeholder')`
  ${(props: IPropData) => camelCaseToKebabCaseOnlyKeys(props['css'])}
`

/**
 * Only wrap the component with styled() if it's a valid component (not a string or React.Fragment)
 */
export const renderComponentWithStyles = (
  ReactComponent: IComponentType,
  extractedProps: IPropData,
  children: React.ReactNode,
) => {
  // do not wrap with styled() if it's React.Fragment
  if (ReactComponent === React.Fragment) {
    return React.createElement(ReactComponent, null, children)
  }

  const props = { ...extractedProps, as: ReactComponent }

  return React.createElement(ReusableStyledComponent, props, children)
}
