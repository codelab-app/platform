import type { IComponentType } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { camelCaseToKebabCaseOnlyKeys } from '@codelab/shared/utils'
import type { PropsWithChildren } from 'react'
import React, { forwardRef } from 'react'
import styled from 'styled-components'

const ReusableStyledComponent = styled('placeholder')`
  ${(props: IPropData) => camelCaseToKebabCaseOnlyKeys(props['css'])}
`

export interface StyledComponentProps {
  ReactComponent: IComponentType
  componentProps: IPropData
}

export const StyledComponent = forwardRef(
  (
    {
      children,
      componentProps,
      ReactComponent,
    }: PropsWithChildren<StyledComponentProps>,
    ref,
  ) => {
    // do not wrap with styled() if it's React.Fragment
    if (ReactComponent === React.Fragment) {
      return children
    }

    // in builder mode, we use ref that is responsible for DnD,
    // in preview or production, we use the ref from props that provides DOM node pointer in store
    const elementRef = ref ?? componentProps['ref']

    return (
      <ReusableStyledComponent
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...componentProps}
        as={ReactComponent}
        ref={elementRef}
      >
        {children}
      </ReusableStyledComponent>
    )
  },
)
