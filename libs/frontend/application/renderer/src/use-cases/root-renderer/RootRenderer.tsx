'use client'

import {
  type IRendererModel,
  type IRootRenderer,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import { MakeChildrenDroppable } from '@codelab/frontend-application-dnd/components'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { WrapIf } from '@codelab/frontend-presentation-view/components/wrapIf'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { observer } from 'mobx-react-lite'
import { forwardRef, useMemo } from 'react'

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

const RootRendererComponent = forwardRef<
  HTMLDivElement,
  { renderer: IRendererModel }
>(({ renderer }, ref) => {
  const { preferenceDomainService } = useDomainStore()
  const preference = preferenceDomainService.preference

  const containerStyle = useMemo(
    () => ({
      /**
       * This sets `container-name` https://developer.mozilla.org/en-US/docs/Web/CSS/container-name, allows for `@container` CSS rules
       */
      container: 'root / inline-size',
      minHeight: '100%',
      transform: 'translatex(0)',
      width: `${preference.builderWidth}px`,
    }),
    [preference.builderWidth],
  )

  return (
    <ErrorBoundary>
      <WrapIf
        Wrapper={MakeChildrenDroppable}
        condition={
          renderer.rendererType !== RendererType.Production &&
          renderer.rendererType !== RendererType.Preview
        }
        wrapperProps={{ data: {}, id: ROOT_RENDER_CONTAINER_ID }}
      >
        <div id={ROOT_RENDER_CONTAINER_ID} ref={ref} style={containerStyle}>
          {renderer.render}
        </div>
      </WrapIf>
    </ErrorBoundary>
  )
})

RootRendererComponent.displayName = 'RootRendererComponent'

export const RootRenderer: IRootRenderer = observer(RootRendererComponent)
