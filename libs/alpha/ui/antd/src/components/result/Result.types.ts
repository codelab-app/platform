import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Result {
  export const propKeys = [
    'title',
    'subTitle',
    'status',
    'icon',
    'extra',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
