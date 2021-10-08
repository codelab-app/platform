import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetLambdasForSelectQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetLambdasForSelectQuery = {
  getLambdas: Array<{ id: string; name: string }>
}

export const GetLambdasForSelectGql = gql`
  query GetLambdasForSelect {
    getLambdas {
      id
      name
    }
  }
`

/**
 * __useGetLambdasForSelectQuery__
 *
 * To run a query within a React component, call `useGetLambdasForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdasForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdasForSelectQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLambdasForSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetLambdasForSelectQuery,
    GetLambdasForSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetLambdasForSelectQuery,
    GetLambdasForSelectQueryVariables
  >(GetLambdasForSelectGql, options)
}
export function useGetLambdasForSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLambdasForSelectQuery,
    GetLambdasForSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetLambdasForSelectQuery,
    GetLambdasForSelectQueryVariables
  >(GetLambdasForSelectGql, options)
}
export type GetLambdasForSelectQueryHookResult = ReturnType<
  typeof useGetLambdasForSelectQuery
>
export type GetLambdasForSelectLazyQueryHookResult = ReturnType<
  typeof useGetLambdasForSelectLazyQuery
>
export type GetLambdasForSelectQueryResult = Apollo.QueryResult<
  GetLambdasForSelectQuery,
  GetLambdasForSelectQueryVariables
>
export function refetchGetLambdasForSelectQuery(
  variables?: GetLambdasForSelectQueryVariables,
) {
  return { query: GetLambdasForSelectGql, variables: variables }
}
