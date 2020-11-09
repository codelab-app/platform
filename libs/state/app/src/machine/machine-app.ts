import { ApolloClient } from '@apollo/client'
import { Actor, Machine, assign, send, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp, EventNameApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { machineLayout } from '@codelab/state/layout'
import { EventNameModal, machineModal } from '@codelab/state/modal'
import {
  createGraphQLDemoMachine,
  createMachineNode,
} from '@codelab/state/node'

export const createMachineApp = (
  nodeService: NodeServiceEntity,
  apolloClient: ApolloClient<any>,
) => {
  const graphQLDemoMachine = createGraphQLDemoMachine(apolloClient)

  return Machine<ContextApp, StateSchemaApp, EventApp>({
    id: 'app',
    initial: StateNameApp.IDLE,
    entry: assign<ContextApp, EventApp>({
      modal: () => spawn(machineModal),
      layout: () => spawn(machineLayout),
      node: () => spawn(createMachineNode(nodeService)),
      graphQLDemo: () => spawn(graphQLDemoMachine),
    }),
    states: {
      [StateNameApp.IDLE]: {
        on: {
          [EventNameApp.CREATED_NODE]: {
            actions: [
              send(EventNameModal.CLOSE, { to: (ctx) => ctx.modal as Actor }), // Need of type assert will be fixed in xState v5
            ],
          },
          [EventNameApp.EDITING_NODE]: {
            actions: [
              send(EventNameModal.OPEN, { to: (ctx) => ctx.modal as Actor }), // Need of type assert will be fixed in xState v5
            ],
          },
          [EventNameApp.EDITED_NODE]: {
            actions: [
              send(EventNameModal.CLOSE, { to: (ctx) => ctx.modal as Actor }), // Need of type assert will be fixed in xState v5
            ],
          },
        },
      },
    },
  })
}
