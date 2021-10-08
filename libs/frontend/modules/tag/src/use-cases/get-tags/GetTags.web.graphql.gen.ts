import * as Types from '@codelab/frontend/abstract/codegen'

import { TagFragment, TagEdgeFragment } from '../Tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TagFragmentDoc, TagEdgeFragmentDoc } from '../Tag.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type GetTagsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetTagsQuery = { getTags: Array<TagFragment> }

export const GetTagsGql = gql`
  query GetTags {
    getTags {
      ...Tag
    }
  }
  ${TagFragmentDoc}
`

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(
    GetTagsGql,
    options,
  )
}
export function useGetTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTagsQuery,
    GetTagsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(
    GetTagsGql,
    options,
  )
}
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>
export type GetTagsQueryResult = Apollo.QueryResult<
  GetTagsQuery,
  GetTagsQueryVariables
>
export function refetchGetTagsQuery(variables?: GetTagsQueryVariables) {
  return { query: GetTagsGql, variables: variables }
}
