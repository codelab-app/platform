import type { IElementModel } from '@codelab/frontend/abstract/domain'
import {
  evaluateExpression,
  hasExpression,
} from '@codelab/frontend/shared/utils'
import type { IPropData } from '@codelab/shared/abstract/core'

export const shouldRenderElement = (
  element: IElementModel,
  props: IPropData = {},
) => {
  if (
    !element.renderIfExpression ||
    !hasExpression(element.renderIfExpression)
  ) {
    return true
  }

  return evaluateExpression(
    element.renderIfExpression,
    element.expressionEvaluationContext,
  )
}
