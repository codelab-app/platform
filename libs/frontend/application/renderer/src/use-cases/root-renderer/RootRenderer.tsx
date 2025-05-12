'use client'

import type { JSXElementConstructor, ReactNode } from 'react'

import {
  type IRendererModel,
  type IRootRenderer,
} from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Alert } from 'antd'
import { observer } from 'mobx-react-lite'
import { forwardRef, useMemo } from 'react'

import { useSetStateOnRender } from '../../hooks/useSetStateOnRender.hook'

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

const RootRendererComponent = forwardRef<
  HTMLDivElement,
  { renderer: IRendererModel }
>(({ renderer }, ref) => {
  const { userDomainService } = useDomainStore()
  const preference = userDomainService.preference

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

  // because `renderer.render` has side effects we need to wrap it in a useEffect
  const rendered = useSetStateOnRender(() => renderer.render)

  return (
    <ErrorBoundary>
      <div id={ROOT_RENDER_CONTAINER_ID} ref={ref} style={containerStyle}>
        {rendered}
      </div>
    </ErrorBoundary>
  )
})

RootRendererComponent.displayName = 'RootRendererComponent'

export const RootRenderer: IRootRenderer = observer(RootRendererComponent)
