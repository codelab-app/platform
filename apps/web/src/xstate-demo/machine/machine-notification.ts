import { DoneInvokeEvent, Machine, assign } from 'xstate'

export interface NotificationStateSchema {
  states: {
    listening: object
  }
}

export type NotificationEvent =
  | {
      type: 'ALERT'
    }
  | { type: 'DISMISS' }

export interface NotificationContext {
  notifications: Array<any>
}

export const notificationsMachine = Machine<
  NotificationContext,
  NotificationStateSchema,
  NotificationEvent & DoneInvokeEvent<any>
>({
  id: 'notificationsMachine',
  initial: 'listening',
  context: {
    notifications: [],
  },
  states: {
    listening: {
      on: {
        ALERT: {
          actions: assign({
            notifications: (ctx: any, event: any) => {
              return [...ctx.notifications, event.data]
            },
          }),
        },
        DISMISS: {
          actions: assign({
            notifications: (ctx, event) => {
              const { id } = event.data

              return ctx.notifications.filter((e) => e.id !== id)
            },
          }),
        },
      },
    },
  },
})
