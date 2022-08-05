import { CypressCommand } from '../../types'
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
    name: 'getNotification',
    fn: getNotification,
  },
  {
    name: 'getNotificationTitle',
    fn: getNotificationTitle,
  },
  {
    name: 'getNotificationBody',
    fn: getNotificationBody,
  },
  {
    name: 'expectNotification',
    fn: expectNotification,
  },
]
