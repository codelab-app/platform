/* eslint-disable react-hooks/rules-of-hooks */

import { gql, useMutation } from '@apollo/client'
import { GraphqlHookConfigFragment } from '@codelab/frontend/modules/element'
import { capitalizeFirstLetter } from '@codelab/shared/utils'
import { HookHandler } from '../HookHandler'
import { apolloClient } from '../utils/apolloClient'

export const useGraphqlMutationHook: HookHandler = (
  config: GraphqlHookConfigFragment,
) => {
  const [mutate, { data, error, called, loading }] = useMutation(
    gql(config.graphqlBody),
    {
      client: apolloClient,
      context: { uri: config.graphqlUrl },
    },
  )

  const res = {
    data,
    error,
    called,
    loading,
    [config.dataKey
      ? `mutate${capitalizeFirstLetter(config.dataKey)}`
      : 'mutate']: mutate,
  }

  if (config.dataKey && res.data && res.data[config.dataKey]) {
    return {
      ...res,
      data: res.data[config.dataKey],
    }
  }

  return res
}
