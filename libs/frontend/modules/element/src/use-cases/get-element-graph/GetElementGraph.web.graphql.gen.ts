import * as Types from '@codelab/frontend/abstract/codegen'

import { ElementGraphFragment } from '../../graphql/ElementGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ElementGraphFragmentDoc } from '../../graphql/ElementGraph.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetElementGraphQueryVariables = Types.Exact<{
  input: Types.GetElementGraphInput
}>

export type GetElementGraphQuery = { getElementGraph: ElementGraphFragment }

export const GetElementGraphGql = gql`
  query GetElementGraph($input: GetElementGraphInput!) {
    getElementGraph(input: $input) {
      ...ElementGraph
    }
  }
  ${ElementGraphFragmentDoc}
`

/**
 * __useGetElementGraphQuery__
 *
 * To run a query within a React component, call `useGetElementGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetElementGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetElementGraphQuery,
    GetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetElementGraphQuery, GetElementGraphQueryVariables>(
    GetElementGraphGql,
    options,
  )
}
export function useGetElementGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetElementGraphQuery,
    GetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetElementGraphQuery,
    GetElementGraphQueryVariables
  >(GetElementGraphGql, options)
}
export type GetElementGraphQueryHookResult = ReturnType<
  typeof useGetElementGraphQuery
>
export type GetElementGraphLazyQueryHookResult = ReturnType<
  typeof useGetElementGraphLazyQuery
>
export type GetElementGraphQueryResult = Apollo.QueryResult<
  GetElementGraphQuery,
  GetElementGraphQueryVariables
>
export function refetchGetElementGraphQuery(
  variables?: GetElementGraphQueryVariables,
) {
  return { query: GetElementGraphGql, variables: variables }
}
