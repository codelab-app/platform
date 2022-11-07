import dynamic, { LoaderComponent } from 'next/dynamic'
import React, { RefObject } from 'react'

/**
 * a workaround for : https://github.com/vercel/next.js/issues/4957
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dynamicLoader = (importPromise: LoaderComponent<any>) =>
  dynamic(
    async () => {
      const result = await importPromise
      const Component = 'default' in result ? result.default : result

      return React.forwardRef(
        (props: { forwardedRef: RefObject<unknown> } & unknown, ref) =>
          React.createElement(Component, { ...props, ref: props.forwardedRef }),
      )
    },
    { ssr: false },
  )
