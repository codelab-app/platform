import { IElement, PropsData } from '@codelab/shared/abstract/core'
import { get, isString } from 'lodash'

const toBoolean = (value: any): boolean => {
  if (isString(value) && value.trim().toLowerCase() === 'false') {
    return false
  }

  return !!value
}

export const shouldStopRendering = (element: IElement, props: PropsData) => {
  const { renderIfPropKey } = element

  if (!renderIfPropKey) {
    return false
  }

  const value = get(props, renderIfPropKey)

  return !toBoolean(value)
}
