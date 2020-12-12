import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Progress {
  export const propKeys = [
    'type',
    'format',
    'percent',
    'showInfo',
    'status',
    'strokeLinecap',
    'strokeColor',
    'trailColor',
    'success',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
