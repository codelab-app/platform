import type { CypressCommand } from '../../types'
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
    name: 'getDropdown',
  },
  {
    fn: getDropdownItem,
    name: 'getDropdownItem',
  },
  {
    fn: selectDropdownItem,
    name: 'selectDropdownItem',
  },
  {
    fn: openDropdown,
    name: 'openDropdown',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: closeDropdown,
    name: 'closeDropdown',
    options: {
      prevSubject: 'element',
    },
  },
  {
    fn: expectDropdownToOpen,
    name: 'expectDropdownToOpen',
  },
  {
    fn: expectDropdownToClose,
    name: 'expectDropdownToClose',
  },
]
