import { PropsFromKeys } from '@codelab/props'

export const textPropKeys = ['value'] as const

export type TextProps = PropsFromKeys<typeof textPropKeys[number]>
