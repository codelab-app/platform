import { StateNodeConfig, assign, sendParent } from 'xstate'

export const editAppState: StateNodeConfig<any, any, any> = {
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
        src: 'editApp',
        onError: {
          target: 'error',
          actions: sendParent((context, event: any) => {
            return {
              type: 'NOTIFY',
              title: 'Error while editing app',
              content: event?.data?.message,
              notificationType: 'error',
            }
          }),
        },
        onDone: {
          target: 'success',
          actions: sendParent({
            type: 'NOTIFY',
            title: 'App edited successfully',
            notificationType: 'success',
          }),
        },
      },
    },
    error: {
      always: 'fillingForm',
    },
    success: {
      type: 'final',
    },
  },
  onDone: 'gettingApps',
}
