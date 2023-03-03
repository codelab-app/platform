import type { CypressCommand } from '../../types'
import {
  expectNotification,
  getNotification,
  getNotificationBody,
  getNotificationTitle,
} from './notification.command'

export interface AntNotificationCommands {
  getNotification: typeof getNotification
  getNotificationTitle: typeof getNotificationTitle
  getNotificationBody: typeof getNotificationBody
  expectNotification: typeof expectNotification
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
