import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace AutoComplete {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
