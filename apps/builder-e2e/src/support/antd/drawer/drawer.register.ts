import type { CypressCommand } from '../../types'
import {
  closeDrawer,
  expectDrawerTitle,
  expectDrawerToClose,
  expectDrawerToOpen,
  getDrawer,
  getDrawerTitle,
} from './drawer.command'

export interface AntDrawerCommands {
  getDrawer: typeof getDrawer
  getDrawerTitle: typeof getDrawerTitle
  closeDrawer: typeof closeDrawer
  expectDrawerTitle: typeof expectDrawerTitle
  expectDrawerToOpen: typeof expectDrawerToOpen
  expectDrawerToClose: typeof expectDrawerToClose
}

export const antDrawerCommands: Array<CypressCommand> = [
  {
    fn: getDrawer,
    name: 'getDrawer',
  },
  {
    fn: getDrawerTitle,
    name: 'getDrawerTitle',
  },
  {
    fn: closeDrawer,
    name: 'closeDrawer',
  },
  {
    fn: expectDrawerTitle,
    name: 'expectDrawerTitle',
  },
  {
    fn: expectDrawerToOpen,
    name: 'expectDrawerToOpen',
  },
  {
    fn: expectDrawerToClose,
    name: 'expectDrawerToClose',
  },
]
