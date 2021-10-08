import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetAtomQueryVariables = Types.Exact<{
  input: Types.GetAtomInput
}>

export type TestGetAtomQuery = {
  atom?:
    | { id: string; name: string; type: Types.AtomType; api: { id: string } }
    | null
    | undefined
}

export const TestGetAtomGql = gql`
  query TestGetAtom($input: GetAtomInput!) {
    atom: getAtom(input: $input) {
      id
      api {
        id
      }
      name
      type
    }
  }
`

/**
 * __useTestGetAtomQuery__
 *
 * To run a query within a React component, call `useTestGetAtomQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetAtomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetAtomQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetAtomQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetAtomQuery,
    TestGetAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetAtomQuery, TestGetAtomQueryVariables>(
    TestGetAtomGql,
    options,
  )
}
export function useTestGetAtomLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetAtomQuery,
    TestGetAtomQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetAtomQuery, TestGetAtomQueryVariables>(
    TestGetAtomGql,
    options,
  )
}
export type TestGetAtomQueryHookResult = ReturnType<typeof useTestGetAtomQuery>
export type TestGetAtomLazyQueryHookResult = ReturnType<
  typeof useTestGetAtomLazyQuery
>
export type TestGetAtomQueryResult = Apollo.QueryResult<
  TestGetAtomQuery,
  TestGetAtomQueryVariables
>
export function refetchTestGetAtomQuery(variables?: TestGetAtomQueryVariables) {
  return { query: TestGetAtomGql, variables: variables }
}
