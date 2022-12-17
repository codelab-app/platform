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
    name: 'getPopconfirm',
    fn: getPopconfirm,
  },
  {
    name: 'expectPopconfirm',
    fn: expectPopconfirm,
  },
  {
    name: 'confirmPopconfirm',
    fn: confirmPopconfirm,
  },
  {
    name: 'cancelPopconfirm',
    fn: cancelPopconfirm,
  },
]
