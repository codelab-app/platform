import type {
  IElement,
  IPropData,
  IStore,
} from '@codelab/frontend/abstract/core'
import { hasStateExpression } from '@codelab/frontend/shared/utils'

export const shouldRenderElement = (
  { renderIfExpression }: IElement,
  props: IPropData = {},
  store: IStore,
) => {
  if (!renderIfExpression || !hasStateExpression(renderIfExpression)) {
    return true
  }

  return store.evaluateExpression(renderIfExpression, props)
}
