import { PropsFromKeys } from '@codelab/props'

export const backTopPropKeys = [
  'target',
  'visibilityHeight',
  'onClick',
] as const

export type BackTopProps = PropsFromKeys<typeof backTopPropKeys[number]>
