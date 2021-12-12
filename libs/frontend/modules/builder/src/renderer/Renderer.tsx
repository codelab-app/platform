import { TypeKindsContext } from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { ReactElement, ReactNode, useContext, useEffect } from 'react'
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

  useEffect(() => {
    if (context.onRendered) {
      const renderMap: Record<string, ReactElement> = {}
      const queue = [rendered]

      while (queue.length) {
        const element = queue.shift()

        if (element) {
          if (Array.isArray(element)) {
            queue.push(...element)
            continue
          }

          const props = (element as ReactElement)?.props
          const id = props?.['data-id']

          if (id) {
            renderMap[id] = element as ReactElement
          }

          if (props.children) {
            queue.push(props.children)
          }
        }
      }

      context.onRendered(renderMap)
    }
  }, [context, rendered])

  return (
    <ErrorBoundary>
      <RecoilRoot>
        <div style={{ height: '100%' }} id="render-root">
          {rendered}
        </div>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
