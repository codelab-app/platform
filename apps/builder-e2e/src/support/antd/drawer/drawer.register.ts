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
  closeDrawer: typeof closeDrawer
  expectDrawerTitle: typeof expectDrawerTitle
  expectDrawerToClose: typeof expectDrawerToClose
  expectDrawerToOpen: typeof expectDrawerToOpen
  getDrawer: typeof getDrawer
  getDrawerTitle: typeof getDrawerTitle
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
