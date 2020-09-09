import { PropsFromKeys } from '@codelab/shared/interface'

export const inputNumberPropKeys = [
  'autoFocus',
  'defaultValue',
  'disabled',
  'formatter',
  'max',
  'min',
  'parser',
  'precision',
  'decimalSeparator',
  'size',
  'step',
  'value',
  'onChange',
  'onPressEnter',
] as const

export type InputNumberProps = PropsFromKeys<typeof inputNumberPropKeys[number]>
