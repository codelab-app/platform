import {
  ApolloClient,
  FetchResult,
  MutationOptions,
  OperationVariables,
} from '@apollo/client'

export const mutate = <TData = any, TVariables = OperationVariables>(
  client: ApolloClient<any>,
  options: MutationOptions<TData, TVariables>,
): Promise<FetchResult<TData>> => {
  return client.mutate({
    ...options,
  })
}
