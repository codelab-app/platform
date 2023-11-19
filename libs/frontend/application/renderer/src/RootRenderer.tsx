import type { IRendererModel } from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import type { WithStyleProp } from '@codelab/frontend/abstract/types'
import { MakeChildrenDroppable } from '@codelab/frontend/application/dnd'
import { useStore } from '@codelab/frontend/application/shared/store'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { observer } from 'mobx-react-lite'
import React, { useMemo } from 'react'

/**
 * This is the main entrypoint into our Renderer, the main flow recursively renders the children until no more children exists.
 *
 * For children of more than 1 we wrap with fragment, for children of size 1, we destructure the array to a single element.
 *
 * 1. {@link RootRenderer#renderRoot}
 *
 * - Render providers and tree separately
 * - Calls {@link RootRenderer#renderElement}
 *
 * 2. {@link ElementWrapper}
 *
 * - Here is where the children are rendered using {@link RootRenderer#renderChildren}
 * - Inside this function, we recursively call {@link RootRenderer#renderElement}
 *
 * For props, there are many different kinds. Props mapping only happen inside ElementWrapper
 *
 * 1. Global props - these use React context to share scope for all descendants
 *
 * - We use this for prop map binding, which is a strategy for passing props to any descendant element. We might deprecate this in the future
 *
 * Hooks and prop map bindings are currently not implemented, since they might be replaced by platform-level mobx.
 */

export const RootRenderer = observer<
  WithStyleProp<{ renderer: IRendererModel }>,
  HTMLDivElement
>(
  React.forwardRef(({ renderer, style = {} }, ref) => {
    const { rendererService } = useStore()

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
        <MakeChildrenDroppable data={{}} id={ROOT_RENDER_CONTAINER_ID}>
          <div id={ROOT_RENDER_CONTAINER_ID} ref={ref} style={containerStyle}>
            {rendererService.renderRoot(renderer)}
          </div>
        </MakeChildrenDroppable>
      </ErrorBoundary>
    )
  }),
)

RootRenderer.displayName = 'Renderer'
