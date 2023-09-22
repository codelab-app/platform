import type { CypressCommand } from '@codelab/testing/cypress/command'
import { getSider } from './layout.command'

export interface AntLayoutCommands {
  getSider: typeof getSider
}

export const antLayoutCommands: Array<CypressCommand> = [
  {
    fn: getSider,
    name: 'getSider',
  },
]
