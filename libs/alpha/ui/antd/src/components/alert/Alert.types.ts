import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Alert {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
