import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
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
  },
  {
    fn: getDrawerTitle,
  },
  {
    fn: closeDrawer,
  },
  {
    fn: expectDrawerTitle,
  },
  {
    fn: expectDrawerToOpen,
  },
  {
    fn: expectDrawerToClose,
  },
]
