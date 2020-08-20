import { PropsFromKeys } from '@codelab/props'

export const typographyTextPropKeys = [
  'code',
  'copyable',
  'delete',
  'disabled',
  'editable',
  'ellipsis',
  'mark',
  'keyboard',
  'underline',
  'onChange',
  'strong',
  'type',
] as const

export const typographyTitlePropKeys = [
  'code',
  'copyable',
  'delete',
  'disabled',
  'editable',
  'ellipsis',
  'level',
  'mark',
  'underline',
  'onChange',
  'type',
] as const

export const typographyParagraphPropKeys = [
  'code',
  'copyable',
  'delete',
  'disabled',
  'editable',
  'ellipsis',
  'mark',
  'keyboard',
  'underline',
  'onChange',
  'strong',
  'type',
] as const

export type TypographyTextProps = PropsFromKeys<
  typeof typographyTextPropKeys[number]
>

export type TypographyTitleProps = PropsFromKeys<
  typeof typographyTitlePropKeys[number]
>

export type TypographyParagraphProps = PropsFromKeys<
  typeof typographyParagraphPropKeys[number]
>
