import { CypressCommand } from '../types'
import { createElementTree } from './builder.command'

export const builderCommands: Array<CypressCommand> = [
  {
    name: 'createElementTree',
    fn: createElementTree,
  },
]
