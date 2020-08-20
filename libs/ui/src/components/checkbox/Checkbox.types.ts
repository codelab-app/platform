import { PropsFromKeys } from '@codelab/props'

export const checkboxPropKeys = [
  'autoFocus',
  'checked',
  'defaultChecked',
  'disabled',
  'indeterminate',
  'onChange',
] as const

export const checkboxGroupPropKeys = [
  'defaultValue',
  'disabled',
  'name',
  'options',
  'value',
  'onChange',
] as const

export type CheckBoxProps = PropsFromKeys<typeof checkboxPropKeys[number]>

export type CheckboxGroupProps = PropsFromKeys<
  typeof checkboxGroupPropKeys[number]
>
