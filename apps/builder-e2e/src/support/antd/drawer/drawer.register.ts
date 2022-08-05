import { CypressCommand } from '../../types'
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
    name: 'getDrawer',
    fn: getDrawer,
  },
  {
    name: 'getDrawerTitle',
    fn: getDrawerTitle,
  },
  {
    name: 'closeDrawer',
    fn: closeDrawer,
  },
  {
    name: 'expectDrawerTitle',
    fn: expectDrawerTitle,
  },
  {
    name: 'expectDrawerToOpen',
    fn: expectDrawerToOpen,
  },
  {
    name: 'expectDrawerToClose',
    fn: expectDrawerToClose,
  },
]
