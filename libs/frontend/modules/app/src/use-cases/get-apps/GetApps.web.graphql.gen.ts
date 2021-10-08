import * as Types from '@codelab/frontend/abstract/codegen'

import { AppFragment } from '../../App.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { AppFragmentDoc } from '../../App.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetAppsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetAppsQuery = { apps: Array<AppFragment> }

export const GetAppsGql = gql`
  query GetApps {
    apps: getApps {
      ...App
    }
  }
  ${AppFragmentDoc}
`

/**
 * __useGetAppsQuery__
 *
 * To run a query within a React component, call `useGetAppsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAppsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAppsQuery, GetAppsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    options,
  )
}
export function useGetAppsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAppsQuery,
    GetAppsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAppsQuery, GetAppsQueryVariables>(
    GetAppsGql,
    options,
  )
}
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>
export type GetAppsQueryResult = Apollo.QueryResult<
  GetAppsQuery,
  GetAppsQueryVariables
>
export function refetchGetAppsQuery(variables?: GetAppsQueryVariables) {
  return { query: GetAppsGql, variables: variables }
}
