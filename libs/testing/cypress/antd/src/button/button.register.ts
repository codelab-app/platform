import { CypressCommand, OmitFirstArg } from '@codelab/testing/cypress/command'
import { getButton } from './button.command'

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
