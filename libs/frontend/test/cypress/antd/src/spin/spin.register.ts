import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
import { getSpinner, waitForSpinners } from './spin.command'

export interface AntSpinCommands {
  getSpinner: OmitFirstArg<typeof getSpinner>
  waitForSpinners: typeof waitForSpinners
}

export const antSpinCommands: Array<CypressCommand> = [
  {
    fn: getSpinner,
    name: 'getSpinner',
    options: {
      prevSubject: 'optional' as any,
    },
  },
  {
    fn: waitForSpinners,
    name: 'waitForSpinners',
  },
]
