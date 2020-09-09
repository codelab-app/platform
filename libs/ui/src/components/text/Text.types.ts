import { PropsFromKeys } from '@codelab/shared/interface'

export const textPropKeys = ['value'] as const

export type TextProps = PropsFromKeys<typeof textPropKeys[number]>
