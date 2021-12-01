import * as Types from '@codelab/frontend/abstract/codegen'

import { TestTypeGraphFragment } from '../../../../tests/graphql/TestTypeGraph.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestTypeGraphFragmentDoc } from '../../../../tests/graphql/TestTypeGraph.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetTypeGraphQueryVariables = Types.Exact<{
  input: Types.GetTypeGraphInput
}>

export type TestGetTypeGraphQuery = {
  getTypeGraph?: TestTypeGraphFragment | null | undefined
}

export const TestGetTypeGraphGql = gql`
  query TestGetTypeGraph($input: GetTypeGraphInput!) {
    getTypeGraph(input: $input) {
      ...TestTypeGraph
    }
  }
  ${TestTypeGraphFragmentDoc}
`

/**
 * __useTestGetTypeGraphQuery__
 *
 * To run a query within a React component, call `useTestGetTypeGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetTypeGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetTypeGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetTypeGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetTypeGraphQuery,
    TestGetTypeGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetTypeGraphQuery, TestGetTypeGraphQueryVariables>(
    TestGetTypeGraphGql,
    options,
  )
}
export function useTestGetTypeGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetTypeGraphQuery,
    TestGetTypeGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetTypeGraphQuery,
    TestGetTypeGraphQueryVariables
  >(TestGetTypeGraphGql, options)
}
export type TestGetTypeGraphQueryHookResult = ReturnType<
  typeof useTestGetTypeGraphQuery
>
export type TestGetTypeGraphLazyQueryHookResult = ReturnType<
  typeof useTestGetTypeGraphLazyQuery
>
export type TestGetTypeGraphQueryResult = Apollo.QueryResult<
  TestGetTypeGraphQuery,
  TestGetTypeGraphQueryVariables
>
export function refetchTestGetTypeGraphQuery(
  variables: TestGetTypeGraphQueryVariables,
) {
  return { query: TestGetTypeGraphGql, variables: variables }
}
