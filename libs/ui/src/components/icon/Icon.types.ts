import { PropsFromKeys } from '@codelab/shared/interface/props'

export const iconPropKeys = [
  'type',
  'style',
  'theme',
  'spin',
  'rotate',
  'twoToneColor',
] as const

export type IconProps = PropsFromKeys<typeof iconPropKeys[number]>
