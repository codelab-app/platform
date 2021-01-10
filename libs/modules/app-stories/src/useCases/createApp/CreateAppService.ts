import { ServiceConfig } from 'xstate/lib/types'
import { CreateAppGql } from './CreateAppInput.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const createAppService: Record<string, ServiceConfig<any, any>> = {
  createApp: async (context, { data }) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    return mutate(getApolloClient(), {
      mutation: CreateAppGql,
      variables: { input: data },
    })
  },
}
