import { PropsFromKeys } from '@codelab/shared/interface'

export const backTopPropKeys = [
  'target',
  'visibilityHeight',
  'onClick',
] as const

export type BackTopProps = PropsFromKeys<typeof backTopPropKeys[number]>
