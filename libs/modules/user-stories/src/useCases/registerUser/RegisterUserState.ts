import { assign } from 'xstate'
import { StateNodeConfig } from 'xstate/lib/types'
import { storeAuthTokenInLocalStorage } from '../../store'

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
        src: 'registerUser',
        onDone: {
          target: '#authenticated',
          actions: [
            assign((context, event) => {
              return {
                userData: event.data.data.registerUser,
              }
            }),
            (context, event) =>
              storeAuthTokenInLocalStorage(
                event.data.data.registerUser.accessToken,
              ),
          ],
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
  },
}
