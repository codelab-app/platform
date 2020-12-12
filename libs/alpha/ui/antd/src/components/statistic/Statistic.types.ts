import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Statistic {
  export const propKeys = [
    'decimalSeparator',
    'formatter',
    'groupSeparator',
    'precision',
    'prefix',
    'suffix',
    'title',
    'value',
    'valueStyle',
  ] as const

  export const countdownPropKeys = [
    'format',
    'onFinish',
    'prefix',
    'suffix',
    'title',
    'value',
    'valueStyle',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type CountdownProps = PropsFromKeys<typeof countdownPropKeys[number]>
}
