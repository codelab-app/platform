import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type TestGetComponentsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetComponentsInput>
}>

export type TestGetComponentsQuery = {
  getComponents: Array<{ id: string; name?: string | null | undefined }>
}

export const TestGetComponentsGql = gql`
  query TestGetComponents($input: GetComponentsInput) {
    getComponents(input: $input) {
      id
      name
    }
  }
`

/**
 * __useTestGetComponentsQuery__
 *
 * To run a query within a React component, call `useTestGetComponentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetComponentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetComponentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetComponentsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestGetComponentsQuery,
    TestGetComponentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    TestGetComponentsQuery,
    TestGetComponentsQueryVariables
  >(TestGetComponentsGql, options)
}
export function useTestGetComponentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetComponentsQuery,
    TestGetComponentsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    TestGetComponentsQuery,
    TestGetComponentsQueryVariables
  >(TestGetComponentsGql, options)
}
export type TestGetComponentsQueryHookResult = ReturnType<
  typeof useTestGetComponentsQuery
>
export type TestGetComponentsLazyQueryHookResult = ReturnType<
  typeof useTestGetComponentsLazyQuery
>
export type TestGetComponentsQueryResult = Apollo.QueryResult<
  TestGetComponentsQuery,
  TestGetComponentsQueryVariables
>
export function refetchTestGetComponentsQuery(
  variables?: TestGetComponentsQueryVariables,
) {
  return { query: TestGetComponentsGql, variables: variables }
}
