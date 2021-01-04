import { ServiceConfig } from 'xstate/lib/types'

export const userSignOutServices: Record<string, ServiceConfig<any, any>> = {
  executeSignOut: (context, event) => {
    // TODO: replace mock with real API call
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  },
}
