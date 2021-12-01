import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetPagesQueryVariables = Types.Exact<{
  input: Types.GetPagesInput
}>

export type TestGetPagesQuery = { pages: Array<{ id: string; name: string }> }

export const TestGetPagesGql = gql`
  query TestGetPages($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      id
      name
    }
  }
`

/**
 * __useTestGetPagesQuery__
 *
 * To run a query within a React component, call `useTestGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetPagesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetPagesQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetPagesQuery,
    TestGetPagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetPagesQuery, TestGetPagesQueryVariables>(
    TestGetPagesGql,
    options,
  )
}
export function useTestGetPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetPagesQuery,
    TestGetPagesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetPagesQuery, TestGetPagesQueryVariables>(
    TestGetPagesGql,
    options,
  )
}
export type TestGetPagesQueryHookResult = ReturnType<
  typeof useTestGetPagesQuery
>
export type TestGetPagesLazyQueryHookResult = ReturnType<
  typeof useTestGetPagesLazyQuery
>
export type TestGetPagesQueryResult = Apollo.QueryResult<
  TestGetPagesQuery,
  TestGetPagesQueryVariables
>
export function refetchTestGetPagesQuery(
  variables: TestGetPagesQueryVariables,
) {
  return { query: TestGetPagesGql, variables: variables }
}
