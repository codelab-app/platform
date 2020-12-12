import { ApolloClient, WatchQueryOptions } from '@apollo/client'
import { handleQueryResult } from './handleResult'

export const createQueryObservable = <
  TVariables = any,
  TData = any,
  TResult = any,
  TCacheShape = any
>(
  apolloClient: ApolloClient<TCacheShape>,
) => (
  options: WatchQueryOptions<TVariables, TData>,
  mapper = (q: TData): TResult => q as any,
) => {
  const query = apolloClient.watchQuery<TData, TVariables>(options)

  return handleQueryResult<TData, TVariables, TResult>(query, mapper)
}
