import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Badge {
  export const propKeys = [
    'color',
    'count',
    'dot',
    'offset',
    'overflowCount',
    'showZero',
    'status',
    'text',
    'title',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
