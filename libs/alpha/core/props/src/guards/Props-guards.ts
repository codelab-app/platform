/* eslint-disable no-underscore-dangle */
import {
  PropItem,
  PropType,
  PropTypeValue,
} from '@codelab/alpha/shared/interface/props'

const checkPropType = (value: PropItem, type: PropType): boolean => {
  if (!(value as PropTypeValue)?.__type) {
    return false
  }

  return (value as PropTypeValue).__type.includes(type)
}

export const isEvalProp = (value: PropItem): value is PropTypeValue => {
  return checkPropType(value, PropType.Eval)
}

export const isSingleRenderProp = (value: PropItem): value is PropTypeValue => {
  return checkPropType(value, PropType.Single)
}

export const isLeafRenderProp = (value: PropItem): value is PropTypeValue => {
  return checkPropType(value, PropType.Leaf)
}

export const isPropTypeValue = (value: PropItem): value is PropTypeValue => {
  return (
    !!(value as PropTypeValue)?.__type &&
    typeof (value as PropTypeValue)?.value !== 'undefined'
  )
}

export const isRenderProp = (value: PropItem): value is PropTypeValue => {
  return isLeafRenderProp(value) || isSingleRenderProp(value)
}
