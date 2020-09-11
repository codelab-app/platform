import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Typography {
  export const textPropKeys = [
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

  export const titlePropKeys = [
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

  export const paragraphPropKeys = [
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

  export type TextProps = PropsFromKeys<typeof textPropKeys[number]>

  export type TitleProps = PropsFromKeys<typeof titlePropKeys[number]>

  export type ParagraphProps = PropsFromKeys<typeof paragraphPropKeys[number]>
}
