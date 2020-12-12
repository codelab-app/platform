import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Skeleton {
  export const propKeys = [
    'active',
    'avatar',
    'loading',
    'paragraph',
    'title',
    'round',
  ] as const

  export const avatarPropKeys = ['active', 'size', 'shape'] as const

  export const titlePropKeys = ['width'] as const

  export const paragraphPropKeys = ['rows', 'width'] as const

  export const buttonPropKeys = ['active', 'size', 'shape'] as const

  export const inputPropKeys = ['active', 'size'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type AvatarProps = PropsFromKeys<typeof avatarPropKeys[number]>

  export type TitleProps = PropsFromKeys<typeof titlePropKeys[number]>

  export type ParagraphProps = PropsFromKeys<typeof paragraphPropKeys[number]>

  export type ButtonProps = PropsFromKeys<typeof buttonPropKeys[number]>

  export type InputProps = PropsFromKeys<typeof inputPropKeys[number]>
}
