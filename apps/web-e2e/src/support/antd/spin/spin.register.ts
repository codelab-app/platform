import { OmitFirstArg } from '../../selectors/types'
import { CypressCommand } from '../../types'
import { getSpinner } from './spin.command'

export interface AntSpinCommands {
  getSpinner: OmitFirstArg<typeof getSpinner>
}

export const antSpinCommands: Array<CypressCommand> = [
  {
    name: 'getSpinner',
    fn: getSpinner,
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
