import { Machine, assign, send, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp, EventNameApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { machineLayout } from '@codelab/state/layout'
import { EventNameModal, machineModal } from '@codelab/state/modal'
import { machineNode } from '@codelab/state/node'

export const machineApp = Machine<ContextApp, StateSchemaApp, EventApp>({
  id: 'app',
  initial: StateNameApp.INIT,
  context: {
    node: null,
    modal: null,
    layout: null,
  },
  states: {
    [StateNameApp.INIT]: {
      entry: assign<ContextApp, EventApp>({
        node: () => spawn(machineNode),
        modal: () => spawn(machineModal),
        layout: () => spawn(machineLayout),
      }),
      on: {
        [EventNameApp.FETCH_DATA]: {
          target: StateNameApp.LOADING,
        },
        [EventNameApp.CREATE_NODE]: {
          actions: [
            'createNode',
            send(EventNameModal.CLOSE, { to: (ctx) => ctx.modal as any }),
          ], // TODO: specify types
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
