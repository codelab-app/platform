import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

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
  ] as const

  export type Props = PropsFromKeys<typeof avatarPropKeys[number]>
}
