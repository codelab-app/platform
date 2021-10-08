import * as Types from '@codelab/frontend/abstract/codegen'

import { TestUserFragment } from '../../../test/test-user.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestUserFragmentDoc } from '../../../test/test-user.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpsertUserMutationVariables = Types.Exact<{
  input: Types.UpsertUserInput
}>

export type TestUpsertUserMutation = { upsertUser: TestUserFragment }

export const TestUpsertUserGql = gql`
  mutation TestUpsertUser($input: UpsertUserInput!) {
    upsertUser(input: $input) {
      ...TestUser
    }
  }
  ${TestUserFragmentDoc}
`
export type TestUpsertUserMutationFn = Apollo.MutationFunction<
  TestUpsertUserMutation,
  TestUpsertUserMutationVariables
>

/**
 * __useTestUpsertUserMutation__
 *
 * To run a mutation, you first call `useTestUpsertUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpsertUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpsertUserMutation, { data, loading, error }] = useTestUpsertUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpsertUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpsertUserMutation,
    TestUpsertUserMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpsertUserMutation,
    TestUpsertUserMutationVariables
  >(TestUpsertUserGql, options)
}
export type TestUpsertUserMutationHookResult = ReturnType<
  typeof useTestUpsertUserMutation
>
export type TestUpsertUserMutationResult =
  Apollo.MutationResult<TestUpsertUserMutation>
export type TestUpsertUserMutationOptions = Apollo.BaseMutationOptions<
  TestUpsertUserMutation,
  TestUpsertUserMutationVariables
>
