import { PropsFromKeys } from '@codelab/props'

export const alertPropKeys = [
  'afterClose',
  'banner',
  'closable',
  'closeText',
  'description',
  'icon',
  'message',
  'showIcon',
  'type',
  'onClose',
] as const

export type AlertProps = PropsFromKeys<typeof alertPropKeys[number]>
