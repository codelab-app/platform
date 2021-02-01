import { Machine, assign, spawn } from 'xstate'
import { createGridMachine } from '@codelab/modules/grid-stories'
import { layoutMachine } from '@codelab/modules/layout-stories'
import { createNotificationMachine } from '@codelab/modules/notification-stories'

export const rootMachine = Machine<any>({
  id: 'core',
  entry: assign({
    layout: () => spawn(layoutMachine, { sync: true }),
    grid: () => spawn(createGridMachine(), { sync: false, autoForward: true }),
    notification: () =>
      spawn(createNotificationMachine(), { sync: false, autoForward: true }),
  }),
  initial: 'idle',
  states: {
    idle: {},
  },
})
