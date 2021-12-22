import { TypeKindsContext } from '@codelab/frontend/modules/type'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { useContext } from 'react'
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

  const context: RenderContext = {
    ...defaultContext,
    getHooksResponse,
    inspect: false,
    render: renderPipeline,
    tree,
  }

  return (
    <div style={{ minHeight: '100%' }} id="render-root">
      {rendered}
    </div>
  )
}
