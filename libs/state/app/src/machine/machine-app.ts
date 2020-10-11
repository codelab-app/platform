import { Machine, assign, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp, EventNameApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { machineModal } from '@codelab/state/modal'
import { machineNode } from '@codelab/state/node'

export const machineApp = Machine<ContextApp, StateSchemaApp, EventApp>({
  id: 'app',
  initial: StateNameApp.INIT,
  context: {
    modal: null,
    node: null,
  },
  states: {
    [StateNameApp.INIT]: {
      // always: [{ cond: () => true }],
      entry: assign({
        modal: () => spawn(machineModal),
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
