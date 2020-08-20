import { PropsFromKeys } from '@codelab/props'

export const avatarPropKeys = [
  'icon',
  'shape',
  'size',
  'src',
  'srcSet',
  'alt',
  'onError',
  'gap',
]

export type AvatarProps = PropsFromKeys<typeof avatarPropKeys[number]>
