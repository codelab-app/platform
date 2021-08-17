import { TemplateProps } from '@codelab/frontend/abstract/props'
import React from 'react'

/**
 * Curry with a custom provider, intended to wrap around a Template component
 */
export const withProvider =
  <P extends any = TemplateProps>(
    ProviderComponent: React.ComponentType<any>,
  ) =>
  (Component: React.ComponentType<P>) => {
    return (props: P) => {
      return (
        <ProviderComponent>
          <Component {...(props as any)} />
        </ProviderComponent>
      )
    }
  }
