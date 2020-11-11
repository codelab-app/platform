import {
  ApolloClient,
  OperationVariables,
  WatchQueryOptions,
} from '@apollo/client'

export const watchQuery = <TData = any, TVariables = OperationVariables>(
  client: ApolloClient<any>,
  options: WatchQueryOptions<TVariables, TData>,
) => {
  return client.watchQuery<TData, TVariables>(options)
}
