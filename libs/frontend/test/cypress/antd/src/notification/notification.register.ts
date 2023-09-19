import type { CypressCommand } from '@codelab/frontend/test/cypress/utils'
import {
  expectNotification,
  getNotification,
  getNotificationBody,
  getNotificationTitle,
} from './notification.command'

export interface AntNotificationCommands {
  expectNotification: typeof expectNotification
  getNotification: typeof getNotification
  getNotificationBody: typeof getNotificationBody
  getNotificationTitle: typeof getNotificationTitle
}

export const antNotificationCommands: Array<CypressCommand> = [
  {
    fn: getNotification,
    name: 'getNotification',
  },
  {
    fn: getNotificationTitle,
    name: 'getNotificationTitle',
  },
  {
    fn: getNotificationBody,
    name: 'getNotificationBody',
  },
  {
    fn: expectNotification,
    name: 'expectNotification',
  },
]