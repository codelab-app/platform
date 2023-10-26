import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { evaluateExpression, hasStateExpression } from './state-expressions'

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
