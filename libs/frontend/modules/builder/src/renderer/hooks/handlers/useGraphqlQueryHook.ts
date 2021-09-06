/* eslint-disable react-hooks/rules-of-hooks */

import { gql, useQuery } from '@apollo/client'
import { GraphqlQueryHookConfigFragment } from '@codelab/frontend/modules/element'
import { QueryHookHandler } from '../QueryHookHandler'
import { apolloClient } from '../utils/apolloClient'

export const useGraphqlQueryHook: QueryHookHandler = (
  config: GraphqlQueryHookConfigFragment,
) => {
  // Only get serializable properties, weird errors happen if we include other things like client
  const {
    data,
    error,
    called,
    loading,
    previousData,
    networkStatus,
    variables,
  } = useQuery(gql(config.graphqlBody), {
    client: apolloClient,
    context: { uri: config.graphqlUrl },
  })

  const res = {
    data,
    error,
    called,
    loading,
    previousData,
    networkStatus,
    variables,
  }

  if (config.dataKey && res.data && res.data[config.dataKey]) {
    return {
      ...res,
      data: res.data[config.dataKey],
    }
  }

  return { res }
}
