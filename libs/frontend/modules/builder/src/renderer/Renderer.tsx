import { TypeKindsContext } from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import React, { ReactElement, useContext, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { defaultRenderContext } from './defaultRenderContext'
import { RenderContext } from './types/RenderTypes'

export interface RendererProps {
  tree: ElementTree
  isComponentRenderer?: boolean
  parentContext?: Omit<RenderContext, 'tree' | 'render'>
}

export const RendererRoot = ({ context, rendered }: any) => {
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
    <div style={{ minHeight: '100%' }} id="render-root">
      {rendered}
    </div>
  )
}

/**
 * Renders an ElementTree
 */
export const Renderer = ({
  tree,
  parentContext,
  isComponentRenderer,
}: RendererProps) => {
  const { typeKindsById } = useContext(TypeKindsContext)

  const root = isComponentRenderer
    ? tree.getRootComponent()
    : tree.getRootElement()

  if (!root) {
    return null
  }

  const defaultContext = defaultRenderContext({
    ...parentContext,
    typeKindsById,
    tree,
  })

  const renderContext: RenderContext = {
    ...defaultContext,
    inspect: false,
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
    <ErrorBoundary>
      <RecoilRoot>
        <RendererRoot
          context={defaultContext}
          rendered={rendered}
        ></RendererRoot>
      </RecoilRoot>
    </ErrorBoundary>
  )
}
