import { PropsFromKeys } from '@codelab/props'

export const autoCompletePropKeys = [
  'allowClear',
  'autoFocus',
  'backfill',
  'children',
  'defaultActiveFirstOption',
  'defaultValue',
  'disabled',
  'filterOption',
  'options',
  'placeholder',
  'value',
  'onBlur',
  'onChange',
  'onFocus',
  'onSearch',
  'onSelect',
  'onSelect',
  'defaultOpen',
  'open',
  'onDropdownVisibleChange',
  'notFoundContent',
] as const

export type AutoCompleteProps = PropsFromKeys<
  typeof autoCompletePropKeys[number]
>
