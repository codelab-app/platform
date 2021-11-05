import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ComponentForSelectFragment = {
  id: string
  name?: string | null | undefined
}

export type GetComponentsForSelectQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetComponentsForSelectQuery = {
  getComponents: Array<ComponentForSelectFragment>
}

export const ComponentForSelectFragmentDoc = gql`
  fragment ComponentForSelect on Element {
    id
    name
  }
`
export const GetComponentsForSelectGql = gql`
  query GetComponentsForSelect {
    getComponents {
      ...ComponentForSelect
    }
  }
  ${ComponentForSelectFragmentDoc}
`

/**
 * __useGetComponentsForSelectQuery__
 *
 * To run a query within a React component, call `useGetComponentsForSelectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentsForSelectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentsForSelectQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetComponentsForSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetComponentsForSelectQuery,
    GetComponentsForSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetComponentsForSelectQuery,
    GetComponentsForSelectQueryVariables
  >(GetComponentsForSelectGql, options)
}
export function useGetComponentsForSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentsForSelectQuery,
    GetComponentsForSelectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetComponentsForSelectQuery,
    GetComponentsForSelectQueryVariables
  >(GetComponentsForSelectGql, options)
}
export type GetComponentsForSelectQueryHookResult = ReturnType<
  typeof useGetComponentsForSelectQuery
>
export type GetComponentsForSelectLazyQueryHookResult = ReturnType<
  typeof useGetComponentsForSelectLazyQuery
>
export type GetComponentsForSelectQueryResult = Apollo.QueryResult<
  GetComponentsForSelectQuery,
  GetComponentsForSelectQueryVariables
>
export function refetchGetComponentsForSelectQuery(
  variables?: GetComponentsForSelectQueryVariables,
) {
  return { query: GetComponentsForSelectGql, variables: variables }
}
