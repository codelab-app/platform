import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { expectMessage, getMessage } from './message.command'

export interface AntMessageCommands {
  expectMessage: typeof expectMessage
  getMessage: typeof getMessage
}

export const antMessageCommands: Array<CypressCommand> = [
  {
    fn: getMessage,
  },
  {
    fn: expectMessage,
  },
]
