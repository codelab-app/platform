import { PropsFromKeys } from '@codelab/shared/interface'

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
