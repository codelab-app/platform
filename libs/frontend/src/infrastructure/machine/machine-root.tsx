import { Machine, assign, spawn } from 'xstate'
import { createAppMachine } from '@codelab/modules/app-stories'
import { createGridMachine } from '@codelab/modules/grid-stories'
import { layoutMachine } from '@codelab/modules/layout-stories'
import { createNotificationMachine } from '@codelab/modules/notification-stories'
import { createUserMachine } from '@codelab/modules/user-stories'

export const rootMachine = Machine<any>({
  id: 'core',
  entry: assign({
    layout: () => spawn(layoutMachine, { sync: true }),
    user: () => spawn(createUserMachine(), { sync: false, autoForward: true }),
    grid: () => spawn(createGridMachine(), { sync: false, autoForward: true }),
    app: () => spawn(createAppMachine(), { sync: false, autoForward: true }),
    notification: () =>
      spawn(createNotificationMachine(), { sync: false, autoForward: true }),
  }),
  initial: 'idle',
  states: {
    idle: {},
  },
})
