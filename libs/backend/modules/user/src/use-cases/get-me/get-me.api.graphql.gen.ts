import * as Types from '@codelab/frontend/abstract/codegen'

import { __UserFragment } from '../../../../../../frontend/modules/user/src/graphql/User.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { __UserFragmentDoc } from '../../../../../../frontend/modules/user/src/graphql/User.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetMeQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetMeQuery = { getMe?: __UserFragment | null | undefined }

export const GetMeGql = gql`
  query GetMe {
    getMe {
      ...__User
    }
  }
  ${__UserFragmentDoc}
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
  baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeGql, options)
}
export function useGetMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeGql, options)
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>
export type GetMeQueryResult = Apollo.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>
export function refetchGetMeQuery(variables?: GetMeQueryVariables) {
  return { query: GetMeGql, variables: variables }
}
