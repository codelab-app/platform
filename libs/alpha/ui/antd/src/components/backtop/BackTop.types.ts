import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace BackTop {
  export const propKeys = ['target', 'visibilityHeight', 'onClick'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
