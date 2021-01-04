import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Message {
  export const propKeys = [
    'content',
    'duration',
    'onClose',
    'icon',
    'key',
    'className',
    'style',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
