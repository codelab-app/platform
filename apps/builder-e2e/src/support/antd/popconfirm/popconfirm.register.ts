import type { CypressCommand } from '../../types'
import {
  cancelPopconfirm,
  confirmPopconfirm,
  expectPopconfirm,
  getPopconfirm,
} from './popconfirm.command'

export interface AntPopconfirmCommands {
  cancelPopconfirm: typeof cancelPopconfirm
  confirmPopconfirm: typeof confirmPopconfirm
  expectPopconfirm: typeof expectPopconfirm
  getPopconfirm: typeof getPopconfirm
}

export const antPopconfirmCommands: Array<CypressCommand> = [
  {
    fn: getPopconfirm,
    name: 'getPopconfirm',
  },
  {
    fn: expectPopconfirm,
    name: 'expectPopconfirm',
  },
  {
    fn: confirmPopconfirm,
    name: 'confirmPopconfirm',
  },
  {
    fn: cancelPopconfirm,
    name: 'cancelPopconfirm',
  },
]
