import { TypeKindsContext } from '@codelab/frontend/modules/type'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { useContext } from 'react'
import { useHookResponse } from './hooks/useHookResponse'
import { RenderContext, RendererProps } from './pipes'
import { RenderContainer } from './renderContainer'

/**
 * Renders an ElementTree
 */
export const Renderer = ({
  tree,
  parentContext,
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

  const defaultContext: RenderContext = {
    ...parentContext,
    typeKindsById,
    tree,
  }

  const context: RenderContext = {
    ...defaultContext,
    getHooksResponse,
    inspect: false,
    tree,
  }

  return (
    <ErrorBoundary>
      <div style={{ minHeight: '100%' }} id="render-root">
        <RenderContainer element={root} context={context} props={{}} isRoot />
      </div>
    </ErrorBoundary>
  )
}
