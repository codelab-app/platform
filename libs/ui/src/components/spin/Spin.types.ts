import { PropsFromKeys } from '@codelab/props'

export const spinPropKeys = [
  'delay',
  'indicator',
  'size',
  'spinning',
  'tip',
  'wrapperClassName',
] as const

export type SpinProps = PropsFromKeys<typeof spinPropKeys[number]>
