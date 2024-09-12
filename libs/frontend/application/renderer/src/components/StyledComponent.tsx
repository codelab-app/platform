import type { IComponentType } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { camelCaseToKebabCaseOnlyKeys } from '@codelab/shared/utils'
import type { PropsWithChildren } from 'react'
import { forwardRef, Fragment, useCallback } from 'react'
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
    const onRefChange = useCallback((node: Nullable<HTMLElement>) => {
      componentProps['ref']?.(node)

      if (ref && node instanceof HTMLElement) {
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      }
    }, [])

    // do not wrap with styled() if it's React.Fragment
    if (ReactComponent === Fragment) {
      return children
    }

    const { key, ...restComponentProps } = componentProps

    return (
      <ReusableStyledComponent
        id="reuseable-styled-component"
        key={key}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restComponentProps}
        as={ReactComponent}
        ref={onRefChange}
      >
        {children}
      </ReusableStyledComponent>
    )
  },
)

StyledComponent.displayName = 'StyledComponent'
