import { IElement } from '@codelab/shared/abstract/core'
import { ReactNode } from 'react'
import { RenderContext, RenderOutput } from '../types/RenderTypes'

export const onRendered = (
  rendered: RenderOutput,
  element: IElement,
  context: RenderContext,
) => {
  const renderCallback = context.onRendered

  const callRendered = (r: ReactNode) => {
    if (context.inspect) {
      console.dir({ element: { ...element }, rendered: r })
    }

    if (renderCallback) {
      renderCallback(r, element)
    }
  }

  if (Array.isArray(rendered)) {
    rendered.forEach((r) => callRendered(r))
  } else {
    callRendered(rendered)
  }
}
