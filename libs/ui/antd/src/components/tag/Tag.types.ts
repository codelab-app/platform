import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Tag {
  export const propKeys = [
    'closable',
    'color',
    'closeIcon',
    'onClose',
    'visible',
    'icon',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
