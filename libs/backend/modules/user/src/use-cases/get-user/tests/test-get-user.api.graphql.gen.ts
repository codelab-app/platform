import * as Types from '@codelab/frontend/abstract/codegen'

import { TestUserFragment } from '../../../test/test-user.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestUserFragmentDoc } from '../../../test/test-user.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestGetUserQueryVariables = Types.Exact<{
  input: Types.GetUserInput
}>

export type TestGetUserQuery = { getUser?: Types.Maybe<TestUserFragment> }

export const TestGetUserGql = gql`
  query TestGetUser($input: GetUserInput!) {
    getUser(input: $input) {
      ...TestUser
    }
  }
  ${TestUserFragmentDoc}
`

/**
 * __useTestGetUserQuery__
 *
 * To run a query within a React component, call `useTestGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestGetUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    TestGetUserQuery,
    TestGetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TestGetUserQuery, TestGetUserQueryVariables>(
    TestGetUserGql,
    options,
  )
}
export function useTestGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TestGetUserQuery,
    TestGetUserQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TestGetUserQuery, TestGetUserQueryVariables>(
    TestGetUserGql,
    options,
  )
}
export type TestGetUserQueryHookResult = ReturnType<typeof useTestGetUserQuery>
export type TestGetUserLazyQueryHookResult = ReturnType<
  typeof useTestGetUserLazyQuery
>
export type TestGetUserQueryResult = Apollo.QueryResult<
  TestGetUserQuery,
  TestGetUserQueryVariables
>
export function refetchTestGetUserQuery(variables?: TestGetUserQueryVariables) {
  return { query: TestGetUserGql, variables: variables }
}
