import { assign, sendParent } from 'xstate'
import { StateNodeConfig } from 'xstate/lib/types'
import { storeAuthToken } from '@codelab/frontend'

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
              storeAuthToken(event.data.data.registerUser.accessToken),
            sendParent({
              type: 'NOTIFY',
              title: 'You have registered successfully!',
              notificationType: 'success',
            }),
          ],
        },
        onError: {
          target: 'idle',
          actions: sendParent((context, event) => {
            return {
              type: 'NOTIFY',
              title: 'Error while registering',
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
