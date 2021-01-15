import { notification } from 'antd'
import { ActionFunction } from 'xstate/lib/types'
import { MachineNotificationEvent } from './machine-notification-event'

export const antNotificationAction: ActionFunction<
  any,
  MachineNotificationEvent
> = (context, event) => {
  notification[event.notificationType || 'info']({
    message: event.title,
    description: event.content,
    placement: 'bottomRight',
  })
}
