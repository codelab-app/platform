import { PropsFromKeys } from '@codelab/props'

export const resultPropKeys = [
  'title',
  'subTitle',
  'status',
  'icon',
  'extra',
] as const

export type ResultProps = PropsFromKeys<typeof resultPropKeys[number]>
