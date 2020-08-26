import { PropsFromKeys } from '@codelab/props'

export const spacePropKeys = ['align', 'direction', 'size'] as const

export type SpaceProps = PropsFromKeys<typeof spacePropKeys[number]>
