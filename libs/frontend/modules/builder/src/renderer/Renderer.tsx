import { TypeKindsContext } from '@codelab/frontend/modules/type'
import React, { useContext } from 'react'
import { useHookResponse } from './hooks/useHookResponse'
import { RenderContext, RendererProps, renderPipeline } from './pipes'

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
    inspect: false,
    render: renderPipeline,
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
    <div style={{ minHeight: '100%' }} id="render-root">
      {rendered}
    </div>
  )
}
