import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace InputNumber {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
