import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
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
  },
  {
    fn: getNotificationTitle,
  },
  {
    fn: getNotificationBody,
  },
  {
    fn: expectNotification,
  },
]
