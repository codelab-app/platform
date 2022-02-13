import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { sum } from 'lodash'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useHookResponse } from './hooks/useHookResponse'
import { RenderContext, RendererProps, renderPipeline } from './pipes'
import { RenderContainer } from './renderContainer'
import { useTypesByIdQuery } from './utils/useTypesByIdQuery'

/**
 * Renders an ElementTree
 */
export const Renderer = ({
  tree,
  context,
  isComponentRenderer,
}: RendererProps) => {
  const { typesById } = useTypesByIdQuery()
  const { getHooksResponse } = useHookResponse()
  // calculate number of hooks attached to the tree
  const hooksCount = sum(tree.getAllVertices().map((v) => v.hooks.length))

  const root = isComponentRenderer
    ? tree.getRootComponent()
    : tree.getRootElement()

  if (!root || !typesById) {
    return null
  }

  const renderContext: RenderContext = {
    ...context,
    getHooksResponse,
    typesById,
    render: renderPipeline,
    inspect: false,
    tree,
  }

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <div id={ROOT_RENDER_CONTAINER_ID} style={{ minHeight: '100%' }}>
          <RenderContainer
            context={renderContext}
            // re-create the tree when a hook is added/deleted
            key={hooksCount}
            props={{}}
            root={root}
          />
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
