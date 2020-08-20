import { PropsFromKeys } from '@codelab/props'

export const badgePropKeys = [
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

export type BadgeProps = PropsFromKeys<typeof badgePropKeys[number]>
