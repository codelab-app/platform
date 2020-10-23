import { InvokeCreator, Machine, sendParent } from 'xstate'
import { ContextNode } from './machine-node--context'
import { EventNameNode, EventNode } from './machine-node--event'
import { StateNameNode, StateSchemaNode } from './machine-node--state'
import { EventNameApp } from '@codelab/state/app'

const fetchNodes: InvokeCreator<ContextNode, EventNode> = (context, event) => {
  return new Promise((resolve) => setTimeout(() => resolve([1, 2, 3]), 1000))
}

export const machineNode = Machine<ContextNode, StateSchemaNode, EventNode>({
  id: 'node',
  initial: StateNameNode.IDLE,
  context: {
    nodes: [],
    node: null,
  },
  states: {
    [StateNameNode.IDLE]: {
      on: {
        // LOAD: {
        //   target: StateNameNode.LOADING,
        // },
        [EventNameNode.NODE_CREATE]: {
          target: StateNameNode.CREATING,
          // actions: assign({
          //   nodes: (context, event) => {
          //     console.log(context, event)

          //     return [...context.nodes]
          //   },
          // }),
        },
      },
    },
    [StateNameNode.LOADING]: {
      // invoke: {
      //   id: 'getNodes',
      //   src: fetchNodes,
      //   onDone: {
      //     target: StateNameNode.SUCCESS,
      //     actions: assign({
      //       nodes: (context, event) => {
      //         console.log(event)
      //         return event.data
      //       },
      //     }),
      //   },
      //   onError: {
      //     target: StateNameNode.ERROR,
      //   },
      // },
    },
    [StateNameNode.EDITING]: {},
    [StateNameNode.CREATING]: {
      entry: [
        sendParent((ctx, event) => ({
          type: EventNameApp.CREATE_NODE,
          payload: event.payload,
        })),
      ],
    },
    [StateNameNode.ERROR]: {},
    [StateNameNode.SUCCESS]: {},
  },
})
