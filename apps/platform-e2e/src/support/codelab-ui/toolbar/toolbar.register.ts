import type { CypressCommand } from '../../types'
import { getToolbarItem } from './toolbar.command'

export interface CodelabUIToolbarCommands {
  getToolbarItem: typeof getToolbarItem
}

export const codelabUIToolbarCommands: Array<CypressCommand> = [
  {
    fn: getToolbarItem,
    name: 'getToolbarItem',
  },
]
