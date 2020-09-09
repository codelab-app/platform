import { Props, PropItem } from './Props.interface'

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
