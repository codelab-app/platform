import type { IElement, IPropData } from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'

export const shouldRenderElement = (
  element: IElement,
  props: IPropData = {},
) => {
  if (
    !element.renderIfExpression ||
    !hasStateExpression(element.renderIfExpression)
  ) {
    return true
  }

  return evaluateExpression(
    element.renderIfExpression,
    element.expressionEvaluationContext,
  )
}
