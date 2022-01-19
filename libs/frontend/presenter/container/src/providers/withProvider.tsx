import React from 'react'

/**
 * Curry with a custom provider, intended to wrap around a Template component
 */
export const withProvider =
  <P,>(ProviderComponent: React.ComponentType<unknown>) =>
  (Component: React.ComponentType<P>) => {
    return (props: P) => {
      return (
        <ProviderComponent>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Component {...props} />
        </ProviderComponent>
      )
    }
  }
