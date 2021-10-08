import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type UpdatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.UpdatePropMapBindingInput
}>

export type UpdatePropMapBindingMutation = {
  updatePropMapBinding?: void | null | undefined
}

export const UpdatePropMapBindingGql = gql`
  mutation UpdatePropMapBinding($input: UpdatePropMapBindingInput!) {
    updatePropMapBinding(input: $input)
  }
`
export type UpdatePropMapBindingMutationFn = Apollo.MutationFunction<
  UpdatePropMapBindingMutation,
  UpdatePropMapBindingMutationVariables
>

/**
 * __useUpdatePropMapBindingMutation__
 *
 * To run a mutation, you first call `useUpdatePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePropMapBindingMutation, { data, loading, error }] = useUpdatePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePropMapBindingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePropMapBindingMutation,
    UpdatePropMapBindingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdatePropMapBindingMutation,
    UpdatePropMapBindingMutationVariables
  >(UpdatePropMapBindingGql, options)
}
export type UpdatePropMapBindingMutationHookResult = ReturnType<
  typeof useUpdatePropMapBindingMutation
>
export type UpdatePropMapBindingMutationResult =
  Apollo.MutationResult<UpdatePropMapBindingMutation>
export type UpdatePropMapBindingMutationOptions = Apollo.BaseMutationOptions<
  UpdatePropMapBindingMutation,
  UpdatePropMapBindingMutationVariables
>
