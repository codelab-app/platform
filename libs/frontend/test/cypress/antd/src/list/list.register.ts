import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
import { getListItem } from './list.command'

export interface AntListCommands {
  getListItem: typeof getListItem
}

export const antListCommands: Array<CypressCommand> = [
  {
    fn: getListItem,
    name: 'getListItem',
  },
]
