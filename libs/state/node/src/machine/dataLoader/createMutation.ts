import { ApolloClient, FetchResult, MutationOptions } from '@apollo/client'

// add support for parameters
export const createMutation = <
  TVariables = any,
  TData = any,
  TCacheShape = any
>(
  apolloClient: ApolloClient<TCacheShape>,
) => async (
  options: MutationOptions<TData, TVariables>,
  mapper = (q: FetchResult<TData>) => q,
) => {
  const result = await apolloClient.mutate({
    ...options,
  })

  return mapper(result)
}
