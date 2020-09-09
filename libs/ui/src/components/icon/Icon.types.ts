import { PropsFromKeys } from '@codelab/shared/interface'

export const iconPropKeys = [
  'type',
  'style',
  'theme',
  'spin',
  'rotate',
  'twoToneColor',
] as const

export type IconProps = PropsFromKeys<typeof iconPropKeys[number]>
