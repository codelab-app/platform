import * as Types from '@codelab/frontend/abstract/codegen'

import { TestElementEdgeFragment } from '../../../../test/graphql/TestElementEdge.fragment.graphql.gen'
import { TestElementFragment } from '../../../../test/graphql/TestElement.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestElementEdgeFragmentDoc } from '../../../../test/graphql/TestElementEdge.fragment.graphql.gen'
import { TestElementFragmentDoc } from '../../../../test/graphql/TestElement.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetElementGraphQueryVariables = Types.Exact<{
  input: Types.GetElementGraphInput
}>

export type TestGetElementGraphQuery = {
  getElementGraph: {
    edges: Array<TestElementEdgeFragment>
    vertices: Array<TestElementFragment>
  }
}

export const TestGetElementGraphGql = gql`
  query TestGetElementGraph($input: GetElementGraphInput!) {
    getElementGraph(input: $input) {
      edges {
        ...TestElementEdge
      }
      vertices {
        ...TestElement
      }
    }
  }
  ${TestElementEdgeFragmentDoc}
  ${TestElementFragmentDoc}
`

/**
 * __useTestGetElementGraphQuery__
 *
 * To run a query within a React component, call `useTestGetElementGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetElementGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetElementGraphQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetElementGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetElementGraphQuery,
    TestGetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    TestGetElementGraphQuery,
    TestGetElementGraphQueryVariables
  >(TestGetElementGraphGql, options)
}
export function useTestGetElementGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetElementGraphQuery,
    TestGetElementGraphQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetElementGraphQuery,
    TestGetElementGraphQueryVariables
  >(TestGetElementGraphGql, options)
}
export type TestGetElementGraphQueryHookResult = ReturnType<
  typeof useTestGetElementGraphQuery
>
export type TestGetElementGraphLazyQueryHookResult = ReturnType<
  typeof useTestGetElementGraphLazyQuery
>
export type TestGetElementGraphQueryResult = Apollo.QueryResult<
  TestGetElementGraphQuery,
  TestGetElementGraphQueryVariables
>
export function refetchTestGetElementGraphQuery(
  variables: TestGetElementGraphQueryVariables,
) {
  return { query: TestGetElementGraphGql, variables: variables }
}
