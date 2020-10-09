import { assign } from 'xstate'

const createUser = () => {
  return Promise.resolve()
}

export const machineNode = {
  id: 'node',
  initial: 'idle',
  states: {
    idle: {
      on: {
        NODE_CREATE: 'pending',
        NODE_UPDATE: '',
      },
    },
    pending: {
      invoke: {
        id: 'createNode',
        src: () => createUser(),
        onDone: {
          target: 'success',
          actions: assign({
            user: (context, event) => {
              console.log(context, event)
            },
          }),
        },
        onError: {
          target: 'failure',
          actions: assign({
            error: (context, event) => {
              console.log(context, event)
            },
          }),
        },
      },
    },
    success: {},
    failure: {},
  },
}
