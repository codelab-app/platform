import { ServiceConfig } from 'xstate/lib/types'
import { LoginUserGql } from './LoginUserRequest.generated'
import { getApolloClient, mutate } from '@codelab/frontend'

export const loginUserServices: Record<string, ServiceConfig<any, any>> = {
  loginUser: async (context, { data }) => {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mutate(getApolloClient(), {
      mutation: LoginUserGql,
      variables: {
        input: data,
      },
    })
  },
}
