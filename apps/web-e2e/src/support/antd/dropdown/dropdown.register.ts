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
  getDropdown: typeof getDropdown
  getDropdownItem: typeof getDropdownItem
  selectDropdownItem: typeof selectDropdownItem
  openDropdown: typeof openDropdown
  closeDropdown: typeof closeDropdown
  expectDropdownToOpen: typeof expectDropdownToOpen
  expectDropdownToClose: typeof expectDropdownToClose
}

export const antDropdownCommands: Array<CypressCommand> = [
  {
    name: 'getDropdown',
    fn: getDropdown,
  },
  {
    name: 'getDropdownItem',
    fn: getDropdownItem,
  },
  {
    name: 'selectDropdownItem',
    fn: selectDropdownItem,
  },
  {
    name: 'openDropdown',
    fn: openDropdown,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'closeDropdown',
    fn: closeDropdown,
    options: {
      prevSubject: 'element',
    },
  },
  {
    name: 'expectDropdownToOpen',
    fn: expectDropdownToOpen,
  },
  {
    name: 'expectDropdownToClose',
    fn: expectDropdownToClose,
  },
]
