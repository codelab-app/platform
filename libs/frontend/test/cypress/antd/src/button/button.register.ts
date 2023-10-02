import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
import type { OmitFirstArg } from '../../deprecated/types'
import type { CypressCommand } from '../types'

export interface AntButtonCommands {
  getButton: OmitFirstArg<typeof getButton>
}

export const antButtonCommands: Array<CypressCommand> = [
  {
    fn: getButton,
    name: 'getButton',
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
