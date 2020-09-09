import { PropsFromKeys } from '@codelab/shared/interface'

export const resultPropKeys = [
  'title',
  'subTitle',
  'status',
  'icon',
  'extra',
] as const

export type ResultProps = PropsFromKeys<typeof resultPropKeys[number]>
