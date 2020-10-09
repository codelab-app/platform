import { Machine, assign } from 'xstate'

const fetchNodes = () => {
  return new Promise((resolve) => setTimeout(() => resolve([1, 2, 3]), 1000))
}

export enum NodeStateName {}

export const machineNode = Machine({
  id: 'node',
  initial: 'idle',
  context: {
    nodes: [],
    node: null,
  },
  states: {
    idle: {
      always: [{ target: 'loading', cond: () => true }],
      // after: {
      //   1000: 'loading',
      // },
      on: {
        LOAD: {
          target: 'loading',
          // actions: assign({
          //   nodes: (context: any, event) => {
          //     console.log('loading!')

          //     return context
          //   },
          // }),
        },
      },
    },
    loading: {
      invoke: {
        id: 'getNodes',
        src: (context, event) => fetchNodes(),
        onDone: {
          target: 'success',
          actions: assign({
            nodes: (context, event) => {
              console.log(event)

              return event.data
            },
          }),
        },
        onError: {
          target: 'error',
        },
      },
    },
    editing: {},
    creating: {},
    error: {},
    success: {},
  },
})
