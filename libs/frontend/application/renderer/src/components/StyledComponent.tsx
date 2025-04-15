import type { IComponentType } from '@codelab/frontend-abstract-domain'
import type { IPropData } from '@codelab/shared-abstract-core'
import type { Nullable } from '@codelab/shared-abstract-types'

import { camelCaseToKebabCaseOnlyKeys } from '@codelab/shared-utils'
import {
  forwardRef,
  Fragment,
  type PropsWithChildren,
  useCallback,
} from 'react'
import styled from 'styled-components'

const Placeholder = styled('placeholder')`
  ${(props: IPropData) => camelCaseToKebabCaseOnlyKeys(props['css'])}
`

export interface StyledComponentProps extends PropsWithChildren {
  ReactComponent: IComponentType
  componentProps: IPropData
}

export const StyledComponent = forwardRef(
  ({ children, componentProps, ReactComponent }: StyledComponentProps, ref) => {
    const { key, ...restComponentProps } = componentProps

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

    if (ReactComponent === Fragment) {
      return children
    }

    return (
      <Placeholder
        id="reuseable-styled-component"
        key={key}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restComponentProps}
        as={ReactComponent}
        ref={onRefChange}
      >
        {children}
      </Placeholder>
    )
  },
)

StyledComponent.displayName = 'StyledComponent'
