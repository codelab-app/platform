import { Machine, StateNodeConfig } from 'xstate'

const createAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  states: {
    fillingForm: {
      on: {
        ON_SUBMIT: {},
      },
    },
    submitting: {
      invoke: {
        src: 'createApp',
        onDone: {
          target: 'success',
        },
        onError: {
          target: 'error',
        },
      },
    },
    success: {
      entry: ['notifySuccess'],
      on: { '': '#app.idle' },
    },
    error: {
      entry: ['notifyError'],
      on: { '': '#app.idle' },
    },
  },
}

const updateAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  states: {},
}

export const createAppMachine = () => {
  return Machine(
    {
      id: 'app',
      initial: 'idle',
      context: {},
      states: {
        idle: {
          on: {
            ON_CREATE_APP: {
              target: 'creatingApp',
            },
          },
        },
        creatingApp: createAppState,
        updatingApp: updateAppState,
      },
    },
    {
      services: {
        createApp: (context, event) => {
          return new Promise((resolve) => {
            setTimeout(resolve, 500)
          })
        },
      },
    },
  )
}
