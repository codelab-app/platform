import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const GetPageGql = gql`
  query GetPage($input: GetPageInput!) {
    getPage(input: $input) {
      title
    }
  }
`

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetPageQuery,
    Types.GetPageQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetPageQuery, Types.GetPageQueryVariables>(
    GetPageGql,
    baseOptions,
  )
}
export function useGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPageQuery,
    Types.GetPageQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetPageQuery, Types.GetPageQueryVariables>(
    GetPageGql,
    baseOptions,
  )
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>
export type GetPageQueryResult = Apollo.QueryResult<
  Types.GetPageQuery,
  Types.GetPageQueryVariables
>
