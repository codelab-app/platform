import { PropItem, Props } from '@codelab/shared/interface/props'

export const isEvalPropValue = (
  propValue: Props[keyof Props],
): propValue is PropItem => {
  return !!propValue?.eval
}

export const isRenderPropValue = (
  propValue: Props[keyof Props],
): propValue is PropItem => {
  return !!propValue?.renderProps
}

export const isSingleRenderPropValue = (
  propValue: Props[keyof Props],
): propValue is PropItem => {
  return (
    isRenderPropValue(propValue) &&
    (propValue.renderProps === true || propValue.renderProps === 'single')
  )
}

export const isLeafRenderPropValue = (
  propValue: Props[keyof Props],
): propValue is PropItem => {
  return isRenderPropValue(propValue) && propValue.renderProps === 'leaf'
}
