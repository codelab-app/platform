import { PropsFromKeys } from '@codelab/shared/interface/props'

export const timelinePropKeys = ['pending', 'pendingDot', 'reverse', 'mode']

export const itemPropKeys = ['color', 'dot', 'position', 'label']

export type TimelineProps = PropsFromKeys<typeof timelinePropKeys[number]>

export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>
