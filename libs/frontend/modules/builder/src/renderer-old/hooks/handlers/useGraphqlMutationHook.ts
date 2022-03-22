import { gql, useMutation } from '@apollo/client'
import { IGraphqlHookConfig } from '@codelab/shared/abstract/core'
import { capitalizeFirstLetter } from '@codelab/shared/utils'
import { HookHandler } from '../HookHandler'
import { apolloClient } from '../utils/apolloClient'

export const useGraphqlMutationHook: HookHandler = (
  config: IGraphqlHookConfig,
  props,
) => {
  const [mutate, { data, error, called, loading }] = useMutation(
    gql(config.graphqlBody),
    {
      client: apolloClient,
      context: { uri: config.graphqlUrl },
      variables: props ?? undefined,
    },
  )

  const response = {
    data,
    error,
    called,
    loading,
    [config.dataKey
      ? `mutate${capitalizeFirstLetter(config.dataKey)}`
      : 'mutate']: mutate,
  }

  const output =
    config.dataKey && response.data && response.data[config.dataKey]
      ? { ...response, data: response.data[config.dataKey] }
      : response

  return { graphqlMutationHook: output }
}
