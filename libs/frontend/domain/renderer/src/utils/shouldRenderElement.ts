import type { IElement, IPropData } from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'

export const shouldRenderElement = (
  { renderIfExpression }: IElement,
  props: IPropData = {},
) => {
  if (!renderIfExpression || !hasStateExpression(renderIfExpression)) {
    return true
  }

  return evaluateExpression(renderIfExpression, props)
}
