import type { CypressCommand } from '../types'
import { createElementTree } from './builder.command'

export interface CypressBuilderCommands {
  createElementTree: typeof createElementTree
}

export const builderCommands: Array<CypressCommand> = [
  {
    fn: createElementTree,
    name: 'createElementTree',
  },
]
