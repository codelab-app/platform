import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { LoaderComponent } from 'next/dynamic'

import dynamic from 'next/dynamic'
import { createElement, forwardRef } from 'react'

interface ForwardedComponentProps extends ObjectLike {
  // Some of the AntD components (Menu, Sider) have prop with name "theme",
  // but it overlaps the default "theme" prop of the styled-component.
  // So when Menu or Sider is wrapped with `styled` component - "theme" prop gets lost.
  // There is a bunch of issue created for that, and the only workaround for now
  // is to pass the prop down with different name. See issues for more details:
  // https://github.com/styled-components/styled-components/issues/4182
  // https://github.com/styled-components/styled-components/issues/4280
  // https://github.com/styled-components/styled-components/issues/4267
  antdTheme?: string
  forwarded: React.ForwardedRef<unknown>
}

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
        antdTheme,
        forwarded,
        ...rest
      }: ForwardedComponentProps) =>
        createElement(Component, {
          ...rest,
          ref: forwarded,
          // need to rename prop back to original name, please see comment above
          theme: antdTheme,
        })

      ForwardedComponent.displayName = 'ForwardedComponent'

      return ForwardedComponent
    },
    { ssr: false },
  )

  // a workaround for: https://github.com/cookpete/react-player/issues/1455
  const DynamicComponent = forwardRef((props: ObjectLike, forwarded) =>
    createElement(LoadedComponent, { ...props, forwarded }),
  )

  DynamicComponent.displayName = 'DynamicComponent'

  return DynamicComponent
}
