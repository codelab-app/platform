import { Machine, assign, send, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp, EventNameApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { machineLayout } from '@codelab/state/layout'
import { EventNameModal, machineModal } from '@codelab/state/modal'
import { createMachineNode } from '@codelab/state/node'

export const createMachineApp = (nodeService: NodeServiceEntity) => {
  return Machine<ContextApp, StateSchemaApp, EventApp>({
    id: 'app',
    initial: StateNameApp.INIT,
    context: {
      node: null,
      modal: null,
      layout: null,
      nodeService,
    },
    states: {
      [StateNameApp.INIT]: {
        entry: assign<ContextApp, EventApp>({
          modal: () => spawn(machineModal),
          layout: () => spawn(machineLayout),
          node: (ctx: ContextApp) => spawn(createMachineNode(ctx.nodeService)),
        }),

        always: StateNameApp.IDLE,
      },
      [StateNameApp.IDLE]: {
        on: {
          [EventNameApp.FETCH_DATA]: {
            target: StateNameApp.LOADING,
          },
          [EventNameApp.CREATED_NODE]: {
            actions: [
              send(EventNameModal.CLOSE, { to: (ctx) => ctx.modal as any }),
            ],
          },
        },
      },
      [StateNameApp.LOADING]: {},
      [StateNameApp.READY]: {},
    },
  })
}
