import type { CypressCommand } from '../../types'
import { expectMessage, getMessage } from './message.command'

export interface AntMessageCommands {
  getMessage: typeof getMessage
  expectMessage: typeof expectMessage
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
