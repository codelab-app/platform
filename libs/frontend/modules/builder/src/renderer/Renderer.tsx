import {
  RENDER_SERVICE,
  ROOT_RENDER_CONTAINER_ID,
  WithServices,
} from '@codelab/frontend/abstract/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { observer } from 'mobx-react-lite'
import React from 'react'

/**
 * This is the main entrypoint into our Renderer, the main flow recursively renders the children until no more children exists.
 *
 * For children of more than 1 we wrap with fragment, for children of size 1, we destructure the array to a single element.
 *
 * 1. {@link RenderService#renderRoot}
 *
 * - Render providers and tree separately
 * - Calls {@link RenderService#renderElement}
 *
 * 2. {@link ElementWrapper}
 *
 * - Here is where the children are rendered using {@link RenderService#renderChildren}
 * - Inside this function, we recursively call {@link RenderService#renderElement}
 *
 * For props, there are many different kinds. Props mapping only happen inside ElementWrapper
 *
 * 1. Global props - these use React context to share scope for all descendants
 *
 * - We use this for prop map binding, which is a strategy for passing props to any descendant element. We might deprecate this in the future
 *
 * Hooks and prop map bindings are currently not implemented, since they might be replaced by platform-level mobx.
 */
export const Renderer = observer<WithServices<RENDER_SERVICE>>(
  ({ renderService }) => {
    if (!renderService.isInitialized) {
      return null
    }

    return (
      <ErrorBoundary>
        <div id={ROOT_RENDER_CONTAINER_ID} style={{ minHeight: '100%' }}>
          {renderService.renderRoot()}
        </div>
      </ErrorBoundary>
    )
  },
)

Renderer.displayName = 'Renderer'
