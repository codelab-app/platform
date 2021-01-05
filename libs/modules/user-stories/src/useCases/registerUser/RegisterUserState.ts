import { StateNodeConfig } from 'xstate/lib/types'

export const registerUserState: StateNodeConfig<any, any, any> = {
  on: {
    ON_MODAL_CANCEL: {
      target: 'idle',
    },
  },
  initial: 'idle',
  states: {
    idle: {
      on: {
        // Triggered by the form with the client-validated data
        ON_SUBMIT: {
          target: 'loading',
        },
      },
    },
    loading: {
      invoke: {
        src: 'executeSignup',
        onDone: {
          target: 'signedUp',
        },
        onError: {
          target: 'idle',
        },
      },
      on: {
        ON_MODAL_CANCEL: {
          target: 'idle',
        },
      },
    },
    signedUp: {
      on: {
        ON_MODAL_OK: {
          target: '#userIdle',
        },
      },
    },
  },
}
