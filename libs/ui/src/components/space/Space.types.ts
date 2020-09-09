import { PropsFromKeys } from '@codelab/shared/interface'

export const spacePropKeys = ['align', 'direction', 'size'] as const

export type SpaceProps = PropsFromKeys<typeof spacePropKeys[number]>
