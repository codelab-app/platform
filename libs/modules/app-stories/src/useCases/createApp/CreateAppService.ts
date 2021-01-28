import { ServiceConfig } from 'xstate/lib/types'
import { getApolloClient, mutate } from '@codelab/frontend'
import { CreateAppGql } from '@codelab/generated'

export const createAppService: Record<string, ServiceConfig<any, any>> = {
  createApp: async (context, { data }) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    return mutate(getApolloClient(), {
      mutation: CreateAppGql,
      variables: { input: data },
    })
  },
}
