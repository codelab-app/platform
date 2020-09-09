import { PropsFromKeys } from '@codelab/shared/interface'

export const spinPropKeys = [
  'delay',
  'indicator',
  'size',
  'spinning',
  'tip',
  'wrapperClassName',
] as const

export type SpinProps = PropsFromKeys<typeof spinPropKeys[number]>
