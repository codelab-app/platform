import type { IElement, IPropData } from '@codelab/frontend/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import get from 'lodash/get'
import { evaluateExpression, hasStateExpression } from './state-expressions'

export const evaluateChildMapperPropKey = (
  element: IElement,
  props: IPropData = {},
) => {
  if (!element.childMapperPropKey) {
    return null
  }

  const storeState = element.store.current.state

  if (hasStateExpression(element.childMapperPropKey)) {
    return evaluateExpression(element.childMapperPropKey, storeState, props)
  }

  const allProps = mergeProps(storeState, { props })

  return get(allProps, element.childMapperPropKey)
}
