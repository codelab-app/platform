import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestExportAppQueryVariables = Types.Exact<{
  input: Types.ExportAppInput
}>

export type TestExportAppQuery = { exportApp: { payload: string } }

export const TestExportAppGql = gql`
  query TestExportApp($input: ExportAppInput!) {
    exportApp(input: $input) {
      payload
    }
  }
`

/**
 * __useTestExportAppQuery__
 *
 * To run a query within a React component, call `useTestExportAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestExportAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestExportAppQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestExportAppQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestExportAppQuery,
    TestExportAppQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestExportAppQuery, TestExportAppQueryVariables>(
    TestExportAppGql,
    options,
  )
}
export function useTestExportAppLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestExportAppQuery,
    TestExportAppQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestExportAppQuery, TestExportAppQueryVariables>(
    TestExportAppGql,
    options,
  )
}
export type TestExportAppQueryHookResult = ReturnType<
  typeof useTestExportAppQuery
>
export type TestExportAppLazyQueryHookResult = ReturnType<
  typeof useTestExportAppLazyQuery
>
export type TestExportAppQueryResult = Apollo.QueryResult<
  TestExportAppQuery,
  TestExportAppQueryVariables
>
export function refetchTestExportAppQuery(
  variables: TestExportAppQueryVariables,
) {
  return { query: TestExportAppGql, variables: variables }
}
