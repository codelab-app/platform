import type { CypressCommand } from '@codelab/frontend/test/cypress/command'
import { expectMessage, getMessage } from './message.command'

export interface AntMessageCommands {
  expectMessage: typeof expectMessage
  getMessage: typeof getMessage
}

export const antMessageCommands: Array<CypressCommand> = [
  {
    fn: getMessage,
    name: 'getMessage',
  },
  {
    fn: expectMessage,
    name: 'expectMessage',
  },
]
