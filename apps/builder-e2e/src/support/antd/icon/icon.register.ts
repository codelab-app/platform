import { OmitFirstArg } from '../../deprecated/types'
import { CypressCommand } from '../../types'
import { getIcon } from './icon.command'

export interface AntIconCommands {
  getIcon: OmitFirstArg<typeof getIcon>
}

export const antIconCommands: Array<CypressCommand> = [
  {
    name: 'getIcon',
    fn: getIcon,
    options: {
      prevSubject: 'optional' as any,
    },
  },
]
