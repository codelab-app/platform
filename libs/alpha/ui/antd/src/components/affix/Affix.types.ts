import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Affix {
  export const propKeys = [
    'offsetBottom',
    'offsetTop',
    'target',
    'onChange',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
