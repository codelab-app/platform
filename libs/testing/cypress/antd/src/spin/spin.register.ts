import type { OmitFirstArg } from '../../deprecated/types'
import type { CypressCommand } from '@codelab/testing/cypress/command'
import { getSpinner } from './spin.command'

export interface AntSpinCommands {
  getSpinner: OmitFirstArg<typeof getSpinner>
}

export const antSpinCommands: Array<CypressCommand> = [
  {
    fn: getSpinner,
    name: 'getSpinner',
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
