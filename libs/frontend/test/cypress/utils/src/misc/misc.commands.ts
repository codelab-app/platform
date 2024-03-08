import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { waitForSpinners } from './misc.register'

export interface MiscCommands {
  waitForSpinners: typeof waitForSpinners
}
export const miscCommands: Array<CypressCommand> = [
  {
    fn: waitForSpinners,
    name: 'waitForSpinners',
  },
]
