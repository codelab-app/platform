import { CypressCommand } from '../../types'
import { getIcon } from './icon.command'

export interface AntIconCommands {
  getIcon: typeof getIcon
}

export const antIconCommands: Array<CypressCommand> = [
  {
    name: 'getIcon',
    fn: getIcon,
  },
]
