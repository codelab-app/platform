import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Rate {
  export const propKeys = [
    'allowClear',
    'allowHalf',
    'autoFocus',
    'character',
    'className',
    'count',
    'defaultValue',
    'disabled',
    'style',
    'tooltips',
    'value',
    'onBlur',
    'onChange',
    'onFocus',
    'onHoverChange',
    'onKeyDown',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
