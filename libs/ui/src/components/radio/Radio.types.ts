import { PropsFromKeys } from '@codelab/props'

export const radioPropKeys = [
  'autoFocus',
  'checked',
  'defaultChecked',
  'disabled',
  'value'
] as const

export const radioGroupPropKeys = [
  'defaultValue',
  'disabled',
  'name',
  'options',
  'size',
  'value',
  'onChange',
  'optionType',
  'buttonStyle'
] as const

export type RadioProps = PropsFromKeys<typeof radioPropKeys[number]>

export type RadioGroupProps = PropsFromKeys<typeof radioGroupPropKeys[number]>
