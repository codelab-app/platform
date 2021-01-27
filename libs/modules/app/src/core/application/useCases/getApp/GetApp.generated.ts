import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
import * as Types from '../../../../../../../../types/types.generated'

export const GetAppGql = gql`
  query GetApp($input: GetAppInput!) {
    getApp(input: $input) {
      title
    }
  }
`

/**
 * __useGetAppQuery__
 *
 * To run a query within a React component, call `useGetAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAppQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAppQuery(
  baseOptions: Apollo.QueryHookOptions<
    Types.GetAppQuery,
    Types.GetAppQueryVariables
  >,
) {
  return Apollo.useQuery<Types.GetAppQuery, Types.GetAppQueryVariables>(
    GetAppGql,
    baseOptions,
  )
}
export function useGetAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Types.GetAppQuery,
    Types.GetAppQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Types.GetAppQuery, Types.GetAppQueryVariables>(
    GetAppGql,
    baseOptions,
  )
}
export type GetAppQueryHookResult = ReturnType<typeof useGetAppQuery>
export type GetAppLazyQueryHookResult = ReturnType<typeof useGetAppLazyQuery>
export type GetAppQueryResult = Apollo.QueryResult<
  Types.GetAppQuery,
  Types.GetAppQueryVariables
>
export type GetAppQueryVariables = Types.Exact<{
  input: Types.GetAppInput
}>

export type GetAppQuery = { __typename?: 'Query' } & {
  getApp?: Types.Maybe<{ __typename?: 'App' } & Pick<Types.App, 'title'>>
}
