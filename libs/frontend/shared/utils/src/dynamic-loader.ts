import type { LoaderComponent } from 'next/dynamic'
import dynamic from 'next/dynamic'
import React from 'react'

/**
 * a workaround for : https://github.com/vercel/next.js/issues/4957
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dynamicLoader = (loadingFn: () => LoaderComponent<any>) => {
  const LoadedComponent = dynamic(
    async () => {
      const result = await loadingFn()
      const Component = 'default' in result ? result.default : result

      const ForwardedComponent = ({
        forwarded,
        ...rest
      }: object & { forwarded: React.ForwardedRef<unknown> }) =>
        React.createElement(Component, { ...rest, ref: forwarded })

      ForwardedComponent.displayName = 'ForwardedComponent'

      return ForwardedComponent
    },
    { ssr: false },
  )

  // a workaround for: https://github.com/cookpete/react-player/issues/1455
  const DynamicComponent = React.forwardRef((props: object, forwarded) =>
    React.createElement(LoadedComponent, { ...props, forwarded }),
  )

  DynamicComponent.displayName = 'DynamicComponent'

  return DynamicComponent
}
