import { IElement } from '@codelab/shared/abstract/core'
import { ReactElement, ReactNode } from 'react'
import { RenderContext, RenderOutput } from '../types/RenderTypes'

export const updateLastRenderProps = (
  context: RenderContext,
  rendered: RenderOutput,
) => {
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
}

export const onRendered = (
  rendered: RenderOutput,
  element: IElement,
  context: RenderContext,
) => {
  const callRendered = (r: ReactNode) => {
    updateLastRenderProps(context, rendered)

    if (context.inspect) {
      console.dir({ element: { ...element }, rendered: r })
    }
  }

  if (Array.isArray(rendered)) {
    rendered.forEach((r) => callRendered(r))
  } else {
    callRendered(rendered)
  }
}
