import { OmitFirstArg } from '../../selectors/types'
import { CypressCommand } from '../../types'
import { getButton } from './button.command'

export interface AntButtonCommands {
  getButton: OmitFirstArg<typeof getButton>
}

export const antButtonCommands: Array<CypressCommand> = [
  {
    name: 'getButton',
    fn: getButton,
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
