import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestUpdatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.UpdatePropMapBindingInput
}>

export type TestUpdatePropMapBindingMutation = {
  updatePropMapBinding?: void | null | undefined
}

export const TestUpdatePropMapBindingGql = gql`
  mutation TestUpdatePropMapBinding($input: UpdatePropMapBindingInput!) {
    updatePropMapBinding(input: $input)
  }
`
export type TestUpdatePropMapBindingMutationFn = Apollo.MutationFunction<
  TestUpdatePropMapBindingMutation,
  TestUpdatePropMapBindingMutationVariables
>

/**
 * __useTestUpdatePropMapBindingMutation__
 *
 * To run a mutation, you first call `useTestUpdatePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdatePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdatePropMapBindingMutation, { data, loading, error }] = useTestUpdatePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdatePropMapBindingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestUpdatePropMapBindingMutation,
    TestUpdatePropMapBindingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestUpdatePropMapBindingMutation,
    TestUpdatePropMapBindingMutationVariables
  >(TestUpdatePropMapBindingGql, options)
}
export type TestUpdatePropMapBindingMutationHookResult = ReturnType<
  typeof useTestUpdatePropMapBindingMutation
>
export type TestUpdatePropMapBindingMutationResult =
  Apollo.MutationResult<TestUpdatePropMapBindingMutation>
export type TestUpdatePropMapBindingMutationOptions =
  Apollo.BaseMutationOptions<
    TestUpdatePropMapBindingMutation,
    TestUpdatePropMapBindingMutationVariables
  >
