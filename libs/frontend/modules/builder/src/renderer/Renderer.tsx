import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import { TypeKindsContext } from '@codelab/frontend/modules/type'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { sum } from 'lodash'
import React, { useContext } from 'react'
import { RecoilRoot } from 'recoil'
import { useHookResponse } from './hooks/useHookResponse'
import { RenderContext, RendererProps, renderPipeline } from './pipes'
import { RenderContainer } from './renderContainer'

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
  const hooksCount = sum(tree.getAllVertices().map((v) => v.hooks.length))

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
    reactRender: React.createElement,
    render: renderPipeline,
    inspect: false,
    tree,
  }

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <div style={{ minHeight: '100%' }} id={ROOT_RENDER_CONTAINER_ID}>
          <RenderContainer
            key={hooksCount}
            context={renderContext}
            root={root}
            props={{}}
          />
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
