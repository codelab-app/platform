import { PropsFromKeys } from '@codelab/shared/interface'

export const inputPropKeys = [
  'addonAfter',
  'addonBefore',
  'defaultValue',
  'disabled',
  'id',
  'maxLength',
  'placeholder',
  'prefix',
  'size',
  'suffix',
  'type',
  'value',
  'onChange',
  'onPressEnter',
  'allowClear',
  'bordered',
] as const

export type InputProps = PropsFromKeys<typeof inputPropKeys[number]>
