import { gql, useQuery } from '@apollo/client'
import { IGraphqlHookConfig } from '@codelab/shared/abstract/core'
import { HookHandler } from '../HookHandler'
import { apolloClient } from '../utils/apolloClient'

export const useGraphqlQueryHook: HookHandler = (
  config: IGraphqlHookConfig,
  inputProps,
) => {
  // Only get serializable properties, weird errors happen if we include other things like client
  const { data, error, called, loading, previousData, networkStatus } =
    useQuery(gql(config.graphqlBody), {
      client: apolloClient,
      variables: inputProps ?? undefined,
      context: { uri: config.graphqlUrl },
    })

  const res = {
    data,
    error,
    called,
    loading,
    previousData,
    networkStatus,
  }

  if (config.dataKey && res.data && res.data[config.dataKey]) {
    return {
      ...res,
      data: res.data[config.dataKey],
    }
  }

  return res
}
