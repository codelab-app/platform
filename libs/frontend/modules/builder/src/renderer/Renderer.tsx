import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import { TypeKindsContext } from '@codelab/frontend/modules/type'
import {
  RenderContext,
  RenderProvider,
} from '@codelab/frontend/presenter/container'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { isEqual } from 'lodash'
import React, { useContext } from 'react'
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
    const { typeKindsById } = useContext(TypeKindsContext)

    const context = defaultRenderContext({
      ...contextProp,
      typeKindsById,
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
          <div id="render-root">
            {context.renderFactory(root, {
              ...(context ?? {}),
              inspect: false,
              tree,
            })}
          </div>
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
