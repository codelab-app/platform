import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import { TypeKindsContext } from '@codelab/frontend/modules/type'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { useContext } from 'react'
import { RecoilRoot } from 'recoil'
import { useHookResponse } from './hooks/useHookResponse'
import { RenderContext, RendererProps, renderPipeline } from './pipes'
import { RenderContainer } from './renderContainer'
import { containerKey } from './utils'

/**
 * Renders an ElementTree
 */
export const Renderer = ({
  tree,
  context,
  isComponentRenderer,
}: RendererProps) => {
  const { typeKindsById } = useContext(TypeKindsContext)
  const { getHooksResponse } = useHookResponse()

  const root = isComponentRenderer
    ? tree.getRootComponent()
    : tree.getRootElement()

  if (!root) {
    return null
  }

  const defaultContext = {
    ...context,
    typeKindsById,
    tree,
  }

  const renderContext: RenderContext = {
    ...defaultContext,
    getHooksResponse,
    render: renderPipeline,
    inspect: false,
    tree,
  }

  if (renderContext.inspect) {
    console.group('Root')
  }

  const rendered = renderContext.render(root, renderContext, {})

  if (renderContext.inspect) {
    console.groupEnd()
  }

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <div
          style={{ minHeight: '100%' }}
          id={ROOT_RENDER_CONTAINER_ID}
          key={containerKey(root)}
        >
          <RenderContainer
            key={containerKey(root)}
            context={renderContext}
            isRoot
          >
            {rendered}
          </RenderContainer>
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
