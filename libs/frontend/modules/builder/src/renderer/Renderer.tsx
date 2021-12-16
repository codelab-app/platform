import { TypeKindsContext } from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { ReactNode, useContext } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultRenderContext } from './defaultRenderContext'
import { RenderContext } from './types/RenderTypes'

export interface RendererProps {
  tree: ElementTree
  isComponentRenderer?: boolean
  context?: Omit<RenderContext, 'tree' | 'render'>
}

/**
 * Renders an ElementTree
 */
export const Renderer = ({
  tree,
  context: contextProp,
  isComponentRenderer,
}: RendererProps) => {
  const { typeKindsById } = useContext(TypeKindsContext)

  const context = defaultRenderContext({
    ...contextProp,
    typeKindsById,
    tree,
  })

  const root = isComponentRenderer
    ? tree.getRootComponent()
    : tree.getRootElement()

  if (context.inspect) {
    console.group('Root')
  }

  let rendered: ReactNode = null

  if (root) {
    rendered = context.render(
      root,
      {
        ...(context ?? {}),
        inspect: false,
        tree,
      },
      {},
    )

    if (context.inspect) {
      console.groupEnd()
    }
  }

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <div style={{ minHeight: '100%' }} id="render-root">
          {rendered}
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
