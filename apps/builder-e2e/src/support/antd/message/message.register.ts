import { CypressCommand } from '../../types'
import { expectMessage, getMessage } from './message.command'

export interface AntMessageCommands {
  getMessage: typeof getMessage
  expectMessage: typeof expectMessage
}

export const antMessageCommands: Array<CypressCommand> = [
  {
    name: 'getMessage',
    fn: getMessage,
  },
  {
    name: 'expectMessage',
    fn: expectMessage,
  },
]
