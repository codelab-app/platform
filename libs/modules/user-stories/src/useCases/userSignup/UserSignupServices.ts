import { ServiceConfig } from 'xstate/lib/types'

export const userSignupServices: Record<string, ServiceConfig<any, any>> = {
  executeSignup: (context, { data }) => {
    console.log(data)

    // TODO: replace mock with real API call
    return new Promise((resolve) => {
      setTimeout(resolve, 500)
    })
  },
}
