import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Avatar {
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

  export type Props = PropsFromKeys<typeof avatarPropKeys[number]>
}
