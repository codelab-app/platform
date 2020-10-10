import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Space {
  export const propKeys = ['align', 'direction', 'size'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
