import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import {
  RenderContext,
  RenderProvider,
} from '@codelab/frontend/presenter/container'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { isEqual } from 'lodash'
import React from 'react'
import { defaultRenderContext } from './defaultRenderContext'

export interface RendererProps {
  tree: ElementTreeGraphql
  context?: Omit<RenderContext<ElementTreeGraphql>, 'tree' | 'renderFactory'>
}

/**
 * The root render point. RendererProvider must be used first.
 */
export const Renderer = React.memo<RendererProps>(
  ({ tree, context: contextProp }: RendererProps) => {
    const context = defaultRenderContext({
      ...contextProp,
      tree,
    })

    const root = tree.getRootVertex()

    if (!root) {
      return null
    }

    if (context.inspect) {
      console.group('Root')
    }

    const rendered = (
      <ErrorBoundary>
        <RenderProvider<ElementTreeGraphql> context={context}>
          {context.renderFactory(root, {
            ...(context ?? {}),
            inspect: false,
            tree,
          })}
        </RenderProvider>
      </ErrorBoundary>
    )

    if (context.inspect) {
      console.groupEnd()
    }

    return rendered
  },
  ({ context, tree }, { tree: newTree, context: newContext }) =>
    isEqual(tree, newTree) && isEqual(context, newContext),
)
