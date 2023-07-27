import type { CypressCommand } from '../../types'
import {
  getCuiSidebar,
  getCuiSidebarToolbarItem,
  getCuiSidebarViewContent,
  getCuiSidebarViewHeader,
} from './sidebar.command'

export interface CodelabUISidebarCommands {
  getCuiSidebar: typeof getCuiSidebar
  getCuiSidebarToolbarItem: typeof getCuiSidebarToolbarItem
  getCuiSidebarViewContent: typeof getCuiSidebarViewContent
  getCuiSidebarViewHeader: typeof getCuiSidebarViewHeader
}

export const codelabUISidebarCommands: Array<CypressCommand> = [
  {
    fn: getCuiSidebar,
    name: 'getCuiSidebar',
  },
  {
    fn: getCuiSidebarViewContent,
    name: 'getCuiSidebarViewContent',
  },
  {
    fn: getCuiSidebarViewHeader,
    name: 'getCuiSidebarViewHeader',
  },
  {
    fn: getCuiSidebarToolbarItem,
    name: 'getCuiSidebarToolbarItem',
  },
]
