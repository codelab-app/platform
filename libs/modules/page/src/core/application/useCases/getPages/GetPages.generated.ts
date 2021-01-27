import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const GetPagesGql = gql`
  query GetPages($input: GetPagesInput!) {
    getPages(input: $input) {
      id
      title
    }
  }
`

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetPagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetPagesQuery,
    Types.GetPagesQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetPagesQuery, Types.GetPagesQueryVariables>(
    GetPagesGql,
    baseOptions,
  )
}
export function useGetPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetPagesQuery,
    Types.GetPagesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetPagesQuery, Types.GetPagesQueryVariables>(
    GetPagesGql,
    baseOptions,
  )
}
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>
export type GetPagesLazyQueryHookResult = ReturnType<
  typeof useGetPagesLazyQuery
>
export type GetPagesQueryResult = Apollo.QueryResult<
  Types.GetPagesQuery,
  Types.GetPagesQueryVariables
>
