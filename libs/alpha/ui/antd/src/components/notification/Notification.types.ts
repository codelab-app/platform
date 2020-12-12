import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Notification {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
