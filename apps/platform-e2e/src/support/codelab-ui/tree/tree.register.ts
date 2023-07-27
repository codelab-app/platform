import type { CypressCommand } from '../../types'
import {
  getCuiTreeItem,
  getCuiTreeItemByPrimaryTitle,
  getCuiTreeItemBySecondaryTitle,
  getCuiTreeItemToolbar,
} from './tree.command'

export interface CodelabUITreeCommands {
  getCuiTreeItem: typeof getCuiTreeItem
  getCuiTreeItemByPrimaryTitle: typeof getCuiTreeItemByPrimaryTitle
  getCuiTreeItemBySecondaryTitle: typeof getCuiTreeItemBySecondaryTitle
  getCuiTreeItemToolbar: typeof getCuiTreeItemToolbar
}

export const codelabUITreeCommands: Array<CypressCommand> = [
  {
    fn: getCuiTreeItem,
    name: 'getCuiTreeItem',
  },
  {
    fn: getCuiTreeItemByPrimaryTitle,
    name: 'getCuiTreeItemByPrimaryTitle',
  },
  {
    fn: getCuiTreeItemBySecondaryTitle,
    name: 'getCuiTreeItemBySecondaryTitle',
  },
  {
    fn: getCuiTreeItemToolbar,
    name: 'getCuiTreeItemToolbar',
  },
]
