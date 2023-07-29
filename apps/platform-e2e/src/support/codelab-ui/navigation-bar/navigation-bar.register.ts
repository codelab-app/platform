import type { CypressCommand } from '../../types'
import { getCuiNavigationBarItem } from './navigation-bar.command'

export interface CodelabUINavigationBarCommands {
  getCuiNavigationBarItem: typeof getCuiNavigationBarItem
}

export const codelabUINavigationBarCommands: Array<CypressCommand> = [
  {
    fn: getCuiNavigationBarItem,
    name: 'getCuiNavigationBarItem',
  },
]
