import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Empty {
  export const propKeys = ['description', 'imageStyle', 'image'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
