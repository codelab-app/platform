import { ServiceConfig } from 'xstate/lib/types'
import { GetAppsGql } from './GetAppsInput.generated'
import { query } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const getAppsService: Record<string, ServiceConfig<any, any>> = {
  getApps: async () => {
    // TODO: remove sleep from getAppsService
    await new Promise((resolve, reject) => setTimeout(resolve, 500))

    return query(getApolloClient(), {
      query: GetAppsGql,
    })
  },
}
