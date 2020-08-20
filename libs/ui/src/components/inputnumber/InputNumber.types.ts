import { PropsFromKeys } from '@codelab/props'

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
