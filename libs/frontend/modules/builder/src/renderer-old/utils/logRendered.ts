import { IElement } from '@codelab/shared/abstract/core'
import { isArray } from 'lodash'
import { RenderContext, RenderOutput } from '../pipes'

export const logRendered = (
  renderResult: RenderOutput,
  element: IElement,
  context: RenderContext,
) => {
  if (!context.inspect) {
    return
  }

  const renderedToLog = isArray(renderResult) ? renderResult : [renderResult]

  renderedToLog.forEach((rendered) => console.dir({ element, rendered }))
}
