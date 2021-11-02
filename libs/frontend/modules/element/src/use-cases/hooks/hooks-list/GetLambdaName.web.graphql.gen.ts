import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetLambdaNameQueryVariables = Types.Exact<{
  input: Types.GetLambdaInput
}>

export type GetLambdaNameQuery = { getLambda?: Types.Maybe<{ name: string }> }

export const GetLambdaNameGql = gql`
  query GetLambdaName($input: GetLambdaInput!) {
    getLambda(input: $input) {
      name
    }
  }
`

/**
 * __useGetLambdaNameQuery__
 *
 * To run a query within a React component, call `useGetLambdaNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLambdaNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLambdaNameQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLambdaNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetLambdaNameQuery,
    GetLambdaNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetLambdaNameQuery, GetLambdaNameQueryVariables>(
    GetLambdaNameGql,
    options,
  )
}
export function useGetLambdaNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetLambdaNameQuery,
    GetLambdaNameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetLambdaNameQuery, GetLambdaNameQueryVariables>(
    GetLambdaNameGql,
    options,
  )
}
export type GetLambdaNameQueryHookResult = ReturnType<
  typeof useGetLambdaNameQuery
>
export type GetLambdaNameLazyQueryHookResult = ReturnType<
  typeof useGetLambdaNameLazyQuery
>
export type GetLambdaNameQueryResult = Apollo.QueryResult<
  GetLambdaNameQuery,
  GetLambdaNameQueryVariables
>
export function refetchGetLambdaNameQuery(
  variables?: GetLambdaNameQueryVariables,
) {
  return { query: GetLambdaNameGql, variables: variables }
}
