import { Machine, StateNodeConfig } from 'xstate'
import { createAppService } from '../../useCases/createApp/CreateAppService'

const createAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  states: {
    fillingForm: {
      on: {
        ON_SUBMIT: {
          target: 'submitting',
        },
        ON_MODAL_CANCEL: {
          target: '#app.idle',
        },
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
      on: { always: '#app.idle' },
    },
    error: {
      entry: ['notifyError'],
      on: { always: '#app.idle' },
    },
  },
}

const updateAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  states: {},
}

export const createAppMachine = () => {
  const services = { ...createAppService }

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
        // updatingApp: updateAppState,
      },
    },
    {
      services,
    },
  )
}
