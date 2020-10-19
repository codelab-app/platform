import { Machine, assign, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp, EventNameApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { machineNode } from '@codelab/state/node'
import { machineUI } from '@codelab/state/ui'

export const machineApp = Machine<ContextApp, StateSchemaApp, EventApp>({
  id: 'app',
  initial: StateNameApp.INIT,
  context: {
    node: null,
    ui: null,
  },
  states: {
    [StateNameApp.INIT]: {
      // always: [{ cond: () => true }],
      entry: assign({
        ui: () => spawn(machineUI),
        node: () => spawn(machineNode),
      }),
      on: {
        [EventNameApp.FETCH_DATA]: {
          target: StateNameApp.LOADING,
        },
      },
    },
    [StateNameApp.LOADING]: {
      // after: {
      //   1000: StateNameApp.READY,
      // },
    },
    [StateNameApp.READY]: {},
  },
})
