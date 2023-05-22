import type { CypressCommand } from '../../types'
import { getHeaderToolbarItem } from './header-toolbar.command'

export interface CodelabUIHeaderToolbarCommands {
  getHeaderToolbarItem: typeof getHeaderToolbarItem
}

export const codelabUIHeaderToolbarCommands: Array<CypressCommand> = [
  {
    fn: getHeaderToolbarItem,
    name: 'getHeaderToolbarItem',
  },
]
