import { ServiceConfig } from 'xstate/lib/types'
import { UserLoginGql } from './UserLoginRequest.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const userLoginServices: Record<string, ServiceConfig<any, any>> = {
  executeLogIn: (context, { data }) => {
    return mutate(getApolloClient(), {
      mutation: UserLoginGql,
      variables: {
        input: data,
      },
    })
  },
}
