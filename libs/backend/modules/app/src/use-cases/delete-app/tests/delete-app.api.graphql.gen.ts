import * as Types from '@codelab/frontend/abstract/codegen'

import { TestAppFragment } from '../../../test/test-app.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestAppFragmentDoc } from '../../../test/test-app.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestDeleteAppMutationVariables = Types.Exact<{
  input: Types.DeleteAppInput
}>

export type TestDeleteAppMutation = {
  deleteApp?: TestAppFragment | null | undefined
}

export const TestDeleteAppGql = gql`
  mutation TestDeleteApp($input: DeleteAppInput!) {
    deleteApp(input: $input) {
      ...TestApp
    }
  }
  ${TestAppFragmentDoc}
`
export type TestDeleteAppMutationFn = Apollo.MutationFunction<
  TestDeleteAppMutation,
  TestDeleteAppMutationVariables
>

/**
 * __useTestDeleteAppMutation__
 *
 * To run a mutation, you first call `useTestDeleteAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteAppMutation, { data, loading, error }] = useTestDeleteAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteAppMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeleteAppMutation,
    TestDeleteAppMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeleteAppMutation,
    TestDeleteAppMutationVariables
  >(TestDeleteAppGql, options)
}
export type TestDeleteAppMutationHookResult = ReturnType<
  typeof useTestDeleteAppMutation
>
export type TestDeleteAppMutationResult =
  Apollo.MutationResult<TestDeleteAppMutation>
export type TestDeleteAppMutationOptions = Apollo.BaseMutationOptions<
  TestDeleteAppMutation,
  TestDeleteAppMutationVariables
>
