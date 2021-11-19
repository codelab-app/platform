import { TypeKindsContext } from '@codelab/frontend/modules/type'
import {
  RenderContext,
  RenderProvider,
} from '@codelab/frontend/presenter/container'
import { ElementTree } from '@codelab/shared/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { isEqual } from 'lodash'
import React, { useContext } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultRenderContext } from './defaultRenderContext'

export interface RendererProps {
  tree: ElementTree
  context?: Omit<RenderContext, 'tree' | 'renderFactory'>
}

/**
 * Renders an ElementTree
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
        <RenderProvider context={context}>
          <RecoilRoot>
            <div id="render-root">
              {context.renderFactory(root, {
                ...(context ?? {}),
                inspect: false,
                tree,
              })}
            </div>
          </RecoilRoot>
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
