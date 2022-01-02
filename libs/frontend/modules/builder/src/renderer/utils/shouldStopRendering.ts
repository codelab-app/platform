import { IElement } from '@codelab/shared/abstract/core'
import { get, isString } from 'lodash'
import { RenderPipeProps } from '../../store'

const toBoolean = (value: any): boolean => {
  if (isString(value) && value.trim().toLowerCase() === 'false') {
    return false
  }

  return !!value
}

export const shouldStopRendering = (
  element: IElement,
  props: RenderPipeProps,
) => {
  const { renderIfPropKey } = element

  if (!renderIfPropKey) {
    return false
  }

  const value = get(props, renderIfPropKey)

  return !toBoolean(value)
}
