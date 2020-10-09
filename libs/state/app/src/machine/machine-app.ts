import { Machine, assign, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { machineModal } from '@codelab/state/modal'
import { machineNode } from '@codelab/state/node'

export const machineApp = Machine<ContextApp, StateSchemaApp, EventApp>({
  id: 'app',
  initial: StateNameApp.INIT,
  context: {
    machineModalRef: null,
    machineNodeRef: null,
  },
  states: {
    [StateNameApp.INIT]: {
      entry: assign({
        machineModalRef: () => spawn(machineModal),
        machineNodeRef: () => spawn(machineNode),
      }),
      on: {
        '': {
          target: StateNameApp.LOADING,
        },
      },
    },
    [StateNameApp.LOADING]: {
      after: {
        1000: StateNameApp.READY,
      },
    },
    [StateNameApp.READY]: {},
  },
})
