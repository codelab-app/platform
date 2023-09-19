import type { IElementModel, IPropData } from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'

export const shouldRenderElement = (
  element: IElementModel,
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
