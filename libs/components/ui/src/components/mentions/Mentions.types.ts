import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Mentions {
  export const propKeys = [
    'autoFocus',
    'defaultValue',
    'filterOption',
    'notFoundContent',
    'placeholder',
    'placement',
    'prefix',
    'split',
    'validateSearch',
    'value',
    'onChange',
    'onSelect',
    'onSearch',
    'onFocus',
    'onBlur',
    'getPopupContainer',
    'autoSize',
    'onResize',
  ] as const

  export const optionPropKeys = ['children', 'value'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type OptionProps = PropsFromKeys<typeof optionPropKeys[number]>
}
