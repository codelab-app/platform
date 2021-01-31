import { ServiceConfig } from 'xstate/lib/types'
import { getApolloClient, query } from '@codelab/frontend'
import { GetAppsGql } from '@codelab/generated'

export const getAppsService: Record<string, ServiceConfig<any, any>> = {
  getApps: async () => {
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    return query(getApolloClient(), {
      query: GetAppsGql,
    })
  },
}
