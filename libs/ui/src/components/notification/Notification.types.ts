import { PropsFromKeys } from '@codelab/props'

export const notificationPropKeys = [
  'bottom',
  'btn',
  'className',
  'description',
  'duration',
  'getContainer',
  'icon',
  'closeIcon',
  'key',
  'message',
  'onClose',
  'onClick',
  'placement',
  'style',
  'top',
] as const

export type NotificationProps = PropsFromKeys<
  typeof notificationPropKeys[number]
>
