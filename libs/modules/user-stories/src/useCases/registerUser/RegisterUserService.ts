import { ServiceConfig } from 'xstate/lib/types'
import { getApolloClient, mutate } from '@codelab/frontend'
import { RegisterUserGql } from '@codelab/generated'

export const registerUserService: Record<string, ServiceConfig<any, any>> = {
  registerUser: async (context, { data }) => {
    // TODO: remove sleeping from registerUserService and loginUserService
    await new Promise((resolve) => setTimeout(resolve, 500))

    return mutate(getApolloClient(), {
      mutation: RegisterUserGql,
      variables: {
        input: data,
      },
    })
  },
}
