import { ServiceConfig } from 'xstate/lib/types'
import { CreateAppGql } from './CreateAppRequest.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const createAppService: Record<string, ServiceConfig<any, any>> = {
  registerUser: (context, { data }) => {
    console.log(data)

    const results = mutate(getApolloClient(), {
      mutation: CreateAppGql,
      variables: { request: data },
    })

    console.log(results)

    return results
  },
}
