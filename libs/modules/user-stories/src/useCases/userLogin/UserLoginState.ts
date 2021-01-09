import { assign } from 'xstate'
import { StateNodeConfig } from 'xstate/lib/types'
import { storeAuthTokenInLocalStorage } from '../../store'

export const userLoginState: StateNodeConfig<any, any, any> = {
  id: 'login',
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
        src: 'executeLogIn',
        onDone: {
          target: '#authenticated',
          actions: [
            assign((context, event) => {
              return {
                userData: event.data.data.loginUser,
              }
            }),
            (context, event) =>
              storeAuthTokenInLocalStorage(
                event.data.data.loginUser.accessToken,
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
