import { StateNodeConfig, assign, sendParent } from 'xstate'

export const createAppState: StateNodeConfig<any, any, any> = {
  initial: 'fillingForm',
  entry: assign({ formData: {} }), // Empty out any form data we could have
  exit: assign({ formData: {} }),
  states: {
    fillingForm: {
      on: {
        ON_SUBMIT: {
          target: 'submitting',
        },
        ON_MODAL_CANCEL: {
          target: '#app.idle',
        },
        ON_FORM_DATA_CHANGE: {
          target: 'fillingForm',
          actions: assign((c, e) => {
            return {
              formData: e.data,
            }
          }),
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
      entry: sendParent((context, event) => {
        return {
          type: 'NOTIFY',
          notificationType: 'success',
          title: `App '${event.data.data.createApp.title}' created successfully`,
        }
      }),
      always: '#app.gettingApps',
    },
    error: {
      entry: sendParent((context, event) => {
        return {
          type: 'NOTIFY',
          notificationType: 'error',
          title: 'Error while creating app',
          content: event.data?.message,
        }
      }),
      always: 'fillingForm',
    },
  },
}
