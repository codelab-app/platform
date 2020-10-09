import { Machine, assign } from 'xstate'
import { ContextNode } from './machine-node--context'
import { EventNode } from './machine-node--event'
import { StateNameNode, StateSchemaNode } from './machine-node--state'

const fetchNodes = () => {
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
      always: [{ target: StateNameNode.LOADING, cond: () => true }],
      // after: {
      //   1000: 'loading',
      // },
      on: {
        LOAD: {
          target: StateNameNode.LOADING,
          // actions: assign({
          //   nodes: (context: any, event) => {
          //     console.log('loading!')

          //     return context
          //   },
          // }),
        },
      },
    },
    [StateNameNode.LOADING]: {
      invoke: {
        id: 'getNodes',
        src: (context, event) => fetchNodes(),
        onDone: {
          target: StateNameNode.SUCCESS,
          actions: assign({
            nodes: (context, event) => {
              console.log(event)

              return event.data
            },
          }),
        },
        onError: {
          target: StateNameNode.ERROR,
        },
      },
    },
    [StateNameNode.EDITING]: {},
    [StateNameNode.CREATING]: {},
    [StateNameNode.ERROR]: {},
    [StateNameNode.SUCCESS]: {},
  },
})
