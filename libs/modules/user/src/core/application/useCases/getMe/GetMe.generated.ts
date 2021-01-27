import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const GetMeGql = gql`
  query GetMe {
    getMe {
      id
      email
    }
  }
`

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Types.GetMeQuery,
    Types.GetMeQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(
    GetMeGql,
    baseOptions,
  )
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetMeQuery,
    Types.GetMeQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetMeQuery, Types.GetMeQueryVariables>(
    GetMeGql,
    baseOptions,
  )
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeQueryResult = Apollo.QueryResult<
  Types.GetMeQuery,
  Types.GetMeQueryVariables
>
