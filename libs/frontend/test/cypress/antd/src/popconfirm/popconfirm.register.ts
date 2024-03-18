import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
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
  },
  {
    fn: expectPopconfirm,
  },
  {
    fn: confirmPopconfirm,
  },
  {
    fn: cancelPopconfirm,
  },
]
