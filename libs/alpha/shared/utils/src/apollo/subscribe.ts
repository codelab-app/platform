import {
  ApolloClient,
  FetchResult,
  OperationVariables,
  SubscriptionOptions,
} from '@apollo/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import Observable from 'zen-observable'

export const subscribe = <TVariables = OperationVariables, TData = any>(
  client: ApolloClient<any>,
  options: SubscriptionOptions<TVariables, TData>,
): Observable<FetchResult<TData>> => {
  return client.subscribe({
    ...options,
  })
}
