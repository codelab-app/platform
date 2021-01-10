import { ServiceConfig } from 'xstate/lib/types'
import { RegisterUserGql } from './RegisterUserInput.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

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
