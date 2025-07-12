'use client'

import type {
  IRootRenderer,
  IRootRendererProps,
} from '@codelab/frontend-abstract-application'
import type { JSXElementConstructor, ReactNode } from 'react'

import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend-abstract-domain'
import { Alert } from 'antd'
import { observer } from 'mobx-react-lite'
import { forwardRef } from 'react'

//  https://github.com/ant-design/ant-design/issues/52213
const ErrorBoundary = Alert.ErrorBoundary as JSXElementConstructor<{
  children: ReactNode
}>

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

const RootRendererComponent = forwardRef<HTMLDivElement, IRootRendererProps>(
  ({ containerStyle, renderer }, ref) => {
    return (
      <ErrorBoundary>
        <div
          id={ROOT_RENDER_CONTAINER_ID}
          ref={ref}
          style={containerStyle || undefined}
        >
          {renderer.rendered}
        </div>
      </ErrorBoundary>
    )
  },
)

RootRendererComponent.displayName = 'RootRendererComponent'

export const RootRenderer: IRootRenderer = observer(RootRendererComponent)
