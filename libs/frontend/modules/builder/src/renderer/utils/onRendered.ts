import { IElement } from '@codelab/shared/abstract/core'
import { ReactNode } from 'react'
import { RenderContext, RenderOutput } from '../pipes'

export const onRendered = (
  rendered: RenderOutput,
  element: IElement,
  context: RenderContext,
) => {
  const callRendered = (r: ReactNode) => {
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
