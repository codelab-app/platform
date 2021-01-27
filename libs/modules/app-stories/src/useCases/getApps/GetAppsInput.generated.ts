import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../types/types.generated'

export const GetAppsGql = gql`
  query GetApps {
    getApps {
      id
      title
    }
  }
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
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetAppsQuery,
    Types.GetAppsQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetAppsQuery, Types.GetAppsQueryVariables>(
    GetAppsGql,
    baseOptions,
  )
}
export function useGetAppsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetAppsQuery,
    Types.GetAppsQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetAppsQuery, Types.GetAppsQueryVariables>(
    GetAppsGql,
    baseOptions,
  )
}
export type GetAppsQueryHookResult = ReturnType<typeof useGetAppsQuery>
export type GetAppsLazyQueryHookResult = ReturnType<typeof useGetAppsLazyQuery>
export type GetAppsQueryResult = Apollo.QueryResult<
  Types.GetAppsQuery,
  Types.GetAppsQueryVariables
>
