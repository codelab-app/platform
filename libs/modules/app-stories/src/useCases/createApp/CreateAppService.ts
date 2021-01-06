import { ServiceConfig } from 'xstate/lib/types'
import { CreateAppGql } from './CreateAppRequest.generated'
import { mutate } from '@codelab/alpha/shared/utils'
import { getApolloClient } from '@codelab/frontend'

export const createAppService: Record<string, ServiceConfig<any, any>> = {
  createApp: (context, { data }) =>
    mutate(getApolloClient(), {
      mutation: CreateAppGql,
      variables: { request: data },
    }),
}
