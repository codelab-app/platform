import { ServiceConfig } from 'xstate/lib/types'

export const userLoginServices: Record<string, ServiceConfig<any, any>> = {
  executeLogIn: (context, event) => {
    // TODO: replace mock with real API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1234',
          username: event.data.username,
        })
      }, 500)
    })
  },
}
