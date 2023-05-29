import type { CypressCommand } from '../../types'
import { getCuiSkeleton } from './skeleton.command'

export interface CodelabUISkeletonCommands {
  getCuiSkeleton: typeof getCuiSkeleton
}

export const codelabUISkeletonCommands: Array<CypressCommand> = [
  {
    fn: getCuiSkeleton,
    name: 'getCuiSkeleton',
  },
]
