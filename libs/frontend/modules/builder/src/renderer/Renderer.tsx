import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import {
  RenderContext,
  RenderProvider,
} from '@codelab/frontend/presenter/container'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React from 'react'
import { defaultRenderContext } from './defaultRenderContext'

export interface RendererProps {
  tree: ElementTreeGraphql
  context?: Omit<RenderContext<ElementTreeGraphql>, 'tree' | 'renderFactory'>
}

/**
 * The root render point. RendererProvider must be used first.
 */
export const Renderer = ({ tree, context: initialContext }: RendererProps) => {
  const context = defaultRenderContext({
    ...initialContext,
    tree,
  })

  const root = tree.getRootVertex()

  if (!root) {
    return null
  }

  return (
    <ErrorBoundary>
      <RenderProvider<ElementTreeGraphql> context={context}>
        {context.renderFactory(root, {
          ...(context ?? {}),
          tree,
        })}
      </RenderProvider>
    </ErrorBoundary>
  )
}
