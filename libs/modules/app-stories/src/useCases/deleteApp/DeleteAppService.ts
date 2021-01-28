import { ServiceConfig } from 'xstate/lib/types'
import { getApolloClient, mutate } from '@codelab/frontend'
import { DeleteAppGql } from '@codelab/generated'

export const deleteAppService: Record<string, ServiceConfig<any, any>> = {
  deleteApp: async (context, { data }) => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    return mutate(getApolloClient(), {
      mutation: DeleteAppGql,
      variables: { input: data },
    })
  },
}
