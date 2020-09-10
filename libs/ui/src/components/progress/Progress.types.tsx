import { PropsFromKeys } from '@codelab/shared/interface/props'

export const progressPropKeys = [
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

export type ProgressProps = PropsFromKeys<typeof progressPropKeys[number]>
