import * as Types from '@codelab/frontend/abstract/codegen'

import { TestTagFragment } from '../../../test/graphql/tag.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestTagFragmentDoc } from '../../../test/graphql/tag.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetTagQueryVariables = Types.Exact<{
  input: Types.GetTagInput
}>

export type TestGetTagQuery = { getTag?: TestTagFragment | null | undefined }

export const TestGetTagGql = gql`
  query TestGetTag($input: GetTagInput!) {
    getTag(input: $input) {
      ...TestTag
    }
  }
  ${TestTagFragmentDoc}
`

/**
 * __useTestGetTagQuery__
 *
 * To run a query within a React component, call `useTestGetTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTagQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetTagQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetTagQuery,
    TestGetTagQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetTagQuery, TestGetTagQueryVariables>(
    TestGetTagGql,
    options,
  )
}
export function useTestGetTagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetTagQuery,
    TestGetTagQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetTagQuery, TestGetTagQueryVariables>(
    TestGetTagGql,
    options,
  )
}
export type TestGetTagQueryHookResult = ReturnType<typeof useTestGetTagQuery>
export type TestGetTagLazyQueryHookResult = ReturnType<
  typeof useTestGetTagLazyQuery
>
export type TestGetTagQueryResult = Apollo.QueryResult<
  TestGetTagQuery,
  TestGetTagQueryVariables
>
export function refetchTestGetTagQuery(variables?: TestGetTagQueryVariables) {
  return { query: TestGetTagGql, variables: variables }
}
