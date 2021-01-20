import { assign, sendParent } from 'xstate'
import { StateNodeConfig } from 'xstate/lib/types'
import { storeAuthToken } from '@codelab/frontend'

export const loginUserState: StateNodeConfig<any, any, any> = {
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
        src: 'loginUser',
        onDone: {
          target: '#authenticated',
          actions: [
            assign((context, event) => {
              return {
                userData: event.data.data.loginUser,
              }
            }),
            (context, event) =>
              storeAuthToken(event.data.data.loginUser.accessToken),
            sendParent((context, event) => {
              return {
                type: 'NOTIFY',
                notificationType: 'success',
                title: `Welcome back, ${event.data?.data?.loginUser?.email}`,
              }
            }),
          ],
        },
        onError: {
          target: 'idle',
          actions: sendParent((context, event) => {
            return {
              type: 'NOTIFY',
              title: 'Error while logging you in',
              content: event?.data?.message,
              notificationType: 'error',
            }
          }),
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
