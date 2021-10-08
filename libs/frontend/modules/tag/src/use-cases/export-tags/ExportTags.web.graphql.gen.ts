import * as Types from '@codelab/frontend/abstract/codegen'

import { TagGraphFragment } from '../Tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TagGraphFragmentDoc } from '../Tag.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ExportTagsQueryVariables = Types.Exact<{
  input?: Types.Maybe<Types.GetTagGraphsInput>
}>

export type ExportTagsQuery = { getTagGraphs: TagGraphFragment }

export const ExportTagsGql = gql`
  query ExportTags($input: GetTagGraphsInput) {
    getTagGraphs(input: $input) {
      ...TagGraph
    }
  }
  ${TagGraphFragmentDoc}
`

/**
 * __useExportTagsQuery__
 *
 * To run a query within a React component, call `useExportTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportTagsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExportTagsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ExportTagsQuery,
    ExportTagsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ExportTagsQuery, ExportTagsQueryVariables>(
    ExportTagsGql,
    options,
  )
}
export function useExportTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExportTagsQuery,
    ExportTagsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ExportTagsQuery, ExportTagsQueryVariables>(
    ExportTagsGql,
    options,
  )
}
export type ExportTagsQueryHookResult = ReturnType<typeof useExportTagsQuery>
export type ExportTagsLazyQueryHookResult = ReturnType<
  typeof useExportTagsLazyQuery
>
export type ExportTagsQueryResult = Apollo.QueryResult<
  ExportTagsQuery,
  ExportTagsQueryVariables
>
export function refetchExportTagsQuery(variables?: ExportTagsQueryVariables) {
  return { query: ExportTagsGql, variables: variables }
}
