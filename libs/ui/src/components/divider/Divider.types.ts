import { PropsFromKeys } from '@codelab/shared/interface'

export const dividerPropKeys = [
  'className',
  'dashed',
  'orientation',
  'style',
  'type',
  'wrapperClassName',
  'plain',
] as const

export type DividerProps = PropsFromKeys<typeof dividerPropKeys[number]>
