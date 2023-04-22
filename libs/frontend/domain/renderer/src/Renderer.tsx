import type { IRenderer } from '@codelab/frontend/abstract/core'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import type { WithStyleProp } from '@codelab/frontend/abstract/types'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

export type RendererRoot = Pick<IRenderer, 'renderRoot'>
/**
 * This is the main entrypoint into our Renderer, the main flow recursively renders the children until no more children exists.
 *
 * For children of more than 1 we wrap with fragment, for children of size 1, we destructure the array to a single element.
 *
 * 1. {@link Renderer#renderRoot}
 *
 * - Render providers and tree separately
 * - Calls {@link Renderer#renderElement}
 *
 * 2. {@link ElementWrapper}
 *
 * - Here is where the children are rendered using {@link Renderer#renderChildren}
 * - Inside this function, we recursively call {@link Renderer#renderElement}
 *
 * For props, there are many different kinds. Props mapping only happen inside ElementWrapper
 *
 * 1. Global props - these use React context to share scope for all descendants
 *
 * - We use this for prop map binding, which is a strategy for passing props to any descendant element. We might deprecate this in the future
 *
 * Hooks and prop map bindings are currently not implemented, since they might be replaced by platform-level mobx.
 */

const emotionCache = createCache({
  key: ROOT_RENDER_CONTAINER_ID,
  prepend: false,
})

export const Renderer = observer<WithStyleProp<RendererRoot>, HTMLDivElement>(
  React.forwardRef(({ renderRoot, style = {} }, ref) => {
    // this prevents re-rendering too much
    const renderedRoot = useMemo(() => renderRoot(), [])

    const containerStyle = useMemo(
      () => ({
        minHeight: '100%',
        transform: 'translatex(0)',
        ...style,
      }),
      [style],
    )

    return (
      <ErrorBoundary>
        <CacheProvider value={emotionCache}>
          <div id={ROOT_RENDER_CONTAINER_ID} ref={ref} style={containerStyle}>
            {renderedRoot}
          </div>
        </CacheProvider>
      </ErrorBoundary>
    )
  }),
)

Renderer.displayName = 'Renderer'
