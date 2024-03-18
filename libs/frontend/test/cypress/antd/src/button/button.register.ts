import type {
  CypressCommand,
  OmitFirstArg,
} from '@codelab/frontend/test/cypress/shared'
import { getButton } from './button.command'

export interface AntButtonCommands {
  getButton: OmitFirstArg<typeof getButton>
}

export const antButtonCommands: Array<CypressCommand> = [
  {
    fn: getButton,
    options: {
      prevSubject: 'optional',
    },
  },
]
