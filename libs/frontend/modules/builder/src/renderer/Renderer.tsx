import { TypeKindsContext } from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { useContext } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultRenderContext } from './defaultRenderContext'
import { RenderContext } from './types/RenderTypes'

export interface RendererProps {
  tree: ElementTree
  context?: Omit<RenderContext, 'tree' | 'render'>
}

/**
 * Renders an ElementTree
 */
export const Renderer = ({ tree, context: contextProp }: RendererProps) => {
  const { typeKindsById } = useContext(TypeKindsContext)

  const context = defaultRenderContext({
    ...contextProp,
    typeKindsById,
    tree,
  })

  const root = tree.getRootElement()

  if (!root) {
    return null
  }

  if (context.inspect) {
    console.group('Root')
  }

  const rendered = (
    <ErrorBoundary>
      <RecoilRoot>
        <div style={{ height: '100%' }} id="render-root">
          {context.render(
            root,
            {
              ...(context ?? {}),
              inspect: false,
              tree,
            },
            {},
          )}
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  )

  if (context.inspect) {
    console.groupEnd()
  }

  return rendered
}
