import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Text {
  export const propKeys = ['value'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
