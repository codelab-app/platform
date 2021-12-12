import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetAtomsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetAtomsInput>
}>

export type TestGetAtomsQuery = {
  getAtoms?:
    | Array<{
        id: string
        name: string
        type: Types.AtomType
        api: { id: string }
      }>
    | null
    | undefined
}

export const TestGetAtomsGql = gql`
  query TestGetAtoms($input: GetAtomsInput) {
    getAtoms(input: $input) {
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
 * __useTestGetAtomsQuery__
 *
 * To run a query within a React component, call `useTestGetAtomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetAtomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetAtomsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetAtomsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    TestGetAtomsQuery,
    TestGetAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetAtomsQuery, TestGetAtomsQueryVariables>(
    TestGetAtomsGql,
    options,
  )
}
export function useTestGetAtomsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetAtomsQuery,
    TestGetAtomsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetAtomsQuery, TestGetAtomsQueryVariables>(
    TestGetAtomsGql,
    options,
  )
}
export type TestGetAtomsQueryHookResult = ReturnType<
  typeof useTestGetAtomsQuery
>
export type TestGetAtomsLazyQueryHookResult = ReturnType<
  typeof useTestGetAtomsLazyQuery
>
export type TestGetAtomsQueryResult = Apollo.QueryResult<
  TestGetAtomsQuery,
  TestGetAtomsQueryVariables
>
export function refetchTestGetAtomsQuery(
  variables?: TestGetAtomsQueryVariables,
) {
  return { query: TestGetAtomsGql, variables: variables }
}
