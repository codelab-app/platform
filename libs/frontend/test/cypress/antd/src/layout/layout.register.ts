import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { getSider } from './layout.command'

export interface AntLayoutCommands {
  getSider: typeof getSider
}

export const antLayoutCommands: Array<CypressCommand> = [
  {
    fn: getSider,
  },
]
