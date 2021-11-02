import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestDeletePropMapBindingMutationVariables = Types.Exact<{
  input: Types.DeletePropMapBindingInput
}>

export type TestDeletePropMapBindingMutation = {
  deletePropMapBinding?: Types.Maybe<void>
}

export const TestDeletePropMapBindingGql = gql`
  mutation TestDeletePropMapBinding($input: DeletePropMapBindingInput!) {
    deletePropMapBinding(input: $input)
  }
`
export type TestDeletePropMapBindingMutationFn = Apollo.MutationFunction<
  TestDeletePropMapBindingMutation,
  TestDeletePropMapBindingMutationVariables
>

/**
 * __useTestDeletePropMapBindingMutation__
 *
 * To run a mutation, you first call `useTestDeletePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeletePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeletePropMapBindingMutation, { data, loading, error }] = useTestDeletePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeletePropMapBindingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestDeletePropMapBindingMutation,
    TestDeletePropMapBindingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestDeletePropMapBindingMutation,
    TestDeletePropMapBindingMutationVariables
  >(TestDeletePropMapBindingGql, options)
}
export type TestDeletePropMapBindingMutationHookResult = ReturnType<
  typeof useTestDeletePropMapBindingMutation
>
export type TestDeletePropMapBindingMutationResult =
  Apollo.MutationResult<TestDeletePropMapBindingMutation>
export type TestDeletePropMapBindingMutationOptions =
  Apollo.BaseMutationOptions<
    TestDeletePropMapBindingMutation,
    TestDeletePropMapBindingMutationVariables
  >
