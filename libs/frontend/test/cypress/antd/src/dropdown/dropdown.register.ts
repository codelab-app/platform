import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import {
  closeDropdown,
  expectDropdownToClose,
  expectDropdownToOpen,
  getDropdown,
  getDropdownItem,
  openDropdown,
  selectDropdownItem,
} from './dropdown.command'

export interface AntDropdownCommands {
  closeDropdown: typeof closeDropdown
  expectDropdownToClose: typeof expectDropdownToClose
  expectDropdownToOpen: typeof expectDropdownToOpen
  getDropdown: typeof getDropdown
  getDropdownItem: typeof getDropdownItem
  openDropdown: typeof openDropdown
  selectDropdownItem: typeof selectDropdownItem
}

export const antDropdownCommands: Array<CypressCommand> = [
  {
    fn: getDropdown,
  },
  {
    fn: getDropdownItem,
  },
  {
    fn: selectDropdownItem,
  },
  {
    fn: openDropdown,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: closeDropdown,
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: expectDropdownToOpen,
  },
  {
    fn: expectDropdownToClose,
  },
]
