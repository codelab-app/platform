import { ServiceConfig } from 'xstate/lib/types'
import { RegisterUserGql } from './RegisterUserRequest.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const registerUserServices: Record<string, ServiceConfig<any, any>> = {
  executeSignup: (context, { data }) => {
    console.log(data)

    // TODO: replace mock with real API call
    const results = mutate(getApolloClient(), {
      mutation: RegisterUserGql,
      variables: data,
    })

    console.log(results)

    return results
  },
}
