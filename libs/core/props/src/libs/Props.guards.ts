import {
  PropItem,
  PropType,
  PropValue,
  Props,
} from '@codelab/shared/interface/props'

export const propValueCheckFactory = (
  propValue: Props[keyof Props],
  filter: PropType,
): propValue is PropItem => {
  if (!propValue) return false

  // eslint-disable-next-line no-underscore-dangle
  const type = propValue.__type

  return type && (Array.isArray(type) ? type : [type]).includes(filter)
}

export const isEvalPropValue = (
  propValue: Props[keyof Props],
): propValue is PropValue => {
  return propValueCheckFactory(propValue, 'eval')
}

export const isSingleRenderPropValue = (
  propValue: Props[keyof Props],
): propValue is PropValue => {
  return propValueCheckFactory(propValue, 'single')
}

export const isLeafRenderPropValue = (
  propValue: Props[keyof Props],
): propValue is PropValue => {
  return propValueCheckFactory(propValue, 'leaf')
}

export const isRenderPropValue = (
  propValue: Props[keyof Props],
): propValue is PropValue => {
  return isLeafRenderPropValue(propValue) || isSingleRenderPropValue(propValue)
}
