import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestRemoveHookFromElementMutationVariables = Types.Exact<{
  input: Types.RemoveHookFromElementInput
}>

export type TestRemoveHookFromElementMutation = {
  removeHookFromElement?: void | null | undefined
}

export const TestRemoveHookFromElementGql = gql`
  mutation TestRemoveHookFromElement($input: RemoveHookFromElementInput!) {
    removeHookFromElement(input: $input)
  }
`
export type TestRemoveHookFromElementMutationFn = Apollo.MutationFunction<
  TestRemoveHookFromElementMutation,
  TestRemoveHookFromElementMutationVariables
>

/**
 * __useTestRemoveHookFromElementMutation__
 *
 * To run a mutation, you first call `useTestRemoveHookFromElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestRemoveHookFromElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testRemoveHookFromElementMutation, { data, loading, error }] = useTestRemoveHookFromElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestRemoveHookFromElementMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestRemoveHookFromElementMutation,
    TestRemoveHookFromElementMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestRemoveHookFromElementMutation,
    TestRemoveHookFromElementMutationVariables
  >(TestRemoveHookFromElementGql, options)
}
export type TestRemoveHookFromElementMutationHookResult = ReturnType<
  typeof useTestRemoveHookFromElementMutation
>
export type TestRemoveHookFromElementMutationResult =
  Apollo.MutationResult<TestRemoveHookFromElementMutation>
export type TestRemoveHookFromElementMutationOptions =
  Apollo.BaseMutationOptions<
    TestRemoveHookFromElementMutation,
    TestRemoveHookFromElementMutationVariables
  >
