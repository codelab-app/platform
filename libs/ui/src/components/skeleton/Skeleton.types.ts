import { PropsFromKeys } from '@codelab/shared/interface'

export const skeletonPropKeys = [
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

export type SkeletonProps = PropsFromKeys<typeof skeletonPropKeys[number]>

export type AvatarProps = PropsFromKeys<typeof avatarPropKeys[number]>

export type TitleProps = PropsFromKeys<typeof titlePropKeys[number]>

export type ParagraphProps = PropsFromKeys<typeof paragraphPropKeys[number]>

export type ButtonProps = PropsFromKeys<typeof buttonPropKeys[number]>

export type InputProps = PropsFromKeys<typeof inputPropKeys[number]>
