import type { OmitFirstArg } from '../../deprecated/types'
import type { CypressCommand } from '../../types'
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
