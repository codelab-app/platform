import { ApolloClient } from '@apollo/client'
import { Machine, assign, send, spawn } from 'xstate'
import { ContextApp } from './machine-app--context'
import { EventApp, EventNameApp } from './machine-app--event'
import { StateNameApp, StateSchemaApp } from './machine-app--state'
import { NodeService as NodeServiceEntity } from '@codelab/core/node'
import { machineEntity } from '@codelab/state/entity'
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

  return Machine<ContextApp, StateSchemaApp, EventApp>(
    {
      id: 'app',
      initial: StateNameApp.IDLE,
      entry: assign<ContextApp, EventApp>({
        modal: () => spawn(machineModal),
        layout: () => spawn(machineLayout),
        vertex: () => spawn(machineEntity),
        node: () => spawn(createMachineNode(nodeService)),
        graphQLDemo: () => spawn(graphQLDemoMachine),
      }),
      states: {
        [StateNameApp.IDLE]: {
          on: {
            [EventNameApp.START_CREATE]: {
              target: StateNameApp.CREATING,
              actions: [EventNameModal.OPEN],
            },
            [EventNameApp.START_EDIT]: {},
            [EventNameApp.START_DELETE]: {},
            [EventNameApp.CREATED_NODE]: {
              actions: [],
            },
            [EventNameApp.EDITING_NODE]: {
              actions: [],
            },
            [EventNameApp.EDITED_NODE]: {
              actions: [],
            },
          },
        },
        [StateNameApp.LOADING]: {
          on: {
            [EventNameApp.SUCCESS]: {
              target: StateNameApp.IDLE,
              actions: [EventNameApp.SUCCESS],
            },
            [EventNameApp.ERROR]: {},
          },
        },
        [StateNameApp.CREATING]: {
          on: {
            [EventNameApp.CANCEL]: {
              target: StateNameApp.IDLE,
              actions: [EventNameModal.CLOSE],
            },
          },
        },
        [StateNameApp.EDITING]: {},
      },
    },
    {
      actions: {
        [EventNameModal.OPEN]: send(EventNameModal.OPEN, {
          to: (context: ContextApp) => context.modal as any,
        }),
        [EventNameModal.CLOSE]: send(EventNameModal.CLOSE, {
          to: (context: ContextApp) => context.modal as any,
        }),
        [EventNameApp.SUCCESS]: () => {
          console.log('on success')
        },
      },
      services: {},
    },
  )
}
