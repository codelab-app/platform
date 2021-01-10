import { Machine } from 'xstate'
import { antNotificationAction } from './ant-notification-action'
import { MachineNotificationEvent } from './machine-notification-event'

export const createNotificationMachine = () => {
  return Machine<any, any, MachineNotificationEvent>(
    {
      initial: 'notifying',
      states: {
        notifying: {
          on: {
            NOTIFY: {
              actions: 'notify',
            },
          },
        },
      },
    },
    {
      actions: {
        notify: antNotificationAction,
      },
    },
  )
}
