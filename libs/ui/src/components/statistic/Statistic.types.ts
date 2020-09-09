import { PropsFromKeys } from '@codelab/shared/interface'

export const statisticPropKeys = [
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

export type StatisticProps = PropsFromKeys<typeof statisticPropKeys[number]>

export type CountdownProps = PropsFromKeys<typeof countdownPropKeys[number]>
