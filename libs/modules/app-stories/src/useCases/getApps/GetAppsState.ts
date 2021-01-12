import { StateNodeConfig, assign, sendParent } from 'xstate'

export const getAppsState: StateNodeConfig<any, any, any> = {
  invoke: {
    src: 'getApps',
    onError: {
      target: 'error',
      actions: sendParent((context, event: any) => {
        return {
          type: 'NOTIFY',
          title: 'Error while getting apps',
          content: event?.data?.message,
          notificationType: 'error',
        }
      }),
    },
    onDone: {
      target: 'idle',
      actions: assign((context, { data }) => {
        return {
          apps: data?.data?.getApps,
        }
      }),
    },
  },
}
