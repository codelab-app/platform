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
