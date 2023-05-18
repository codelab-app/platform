import type { IElement, IPropData } from '@codelab/frontend/abstract/core'
import {
  evaluateExpression,
  hasStateExpression,
} from '@codelab/frontend/shared/utils'
import { mergeProps } from '@codelab/shared/utils'

export const shouldRenderElement = (
  { renderIfExpression, store }: IElement,
  props: IPropData = {},
) => {
  if (!renderIfExpression || !hasStateExpression(renderIfExpression)) {
    return true
  }

  return evaluateExpression(
    renderIfExpression,
    mergeProps(props, store.current.state),
  )
}
