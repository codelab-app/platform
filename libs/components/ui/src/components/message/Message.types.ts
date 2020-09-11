import { PropsFromKeys } from '@codelab/shared/interface/props'

export const messagePropKeys = [
  'content',
  'duration',
  'onClose',
  'icon',
  'key',
  'className',
  'style',
] as const

export type MessageProps = PropsFromKeys<typeof messagePropKeys[number]>
