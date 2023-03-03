import type { CypressCommand } from '../../types'
import {
  cancelPopconfirm,
  confirmPopconfirm,
  expectPopconfirm,
  getPopconfirm,
} from './popconfirm.command'

export interface AntPopconfirmCommands {
  getPopconfirm: typeof getPopconfirm
  expectPopconfirm: typeof expectPopconfirm
  confirmPopconfirm: typeof confirmPopconfirm
  cancelPopconfirm: typeof cancelPopconfirm
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
