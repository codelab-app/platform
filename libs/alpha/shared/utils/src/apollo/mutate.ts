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
  console.log(options)

  return client.mutate({
    ...options,
  })
}
