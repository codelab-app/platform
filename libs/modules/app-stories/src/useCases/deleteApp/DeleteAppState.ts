import { StateNodeConfig, sendParent } from 'xstate'

export const deleteAppState: StateNodeConfig<any, any, any> = {
  initial: 'loading',
  states: {
    loading: {
      invoke: {
        src: 'deleteApp',
        onError: {
          target: 'error',
          actions: sendParent((context, event: any) => {
            return {
              type: 'NOTIFY',
              title: 'Error while deleting app',
              content: event?.data?.message,
              notificationType: 'error',
            }
          }),
        },
        onDone: {
          target: 'success',
          actions: sendParent({
            type: 'NOTIFY',
            title: 'App deleted successfully',
            notificationType: 'success',
          }),
        },
      },
    },
    error: {
      always: {
        target: '#app.error',
      },
    },
    success: {
      always: {
        target: '#app.gettingApps',
      },
    },
  },
}
