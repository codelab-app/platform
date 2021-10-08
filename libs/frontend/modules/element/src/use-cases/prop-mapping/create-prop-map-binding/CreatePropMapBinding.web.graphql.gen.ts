import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type CreatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.CreatePropMapBindingInput
}>

export type CreatePropMapBindingMutation = {
  createPropMapBinding: { id: string }
}

export const CreatePropMapBindingGql = gql`
  mutation CreatePropMapBinding($input: CreatePropMapBindingInput!) {
    createPropMapBinding(input: $input) {
      id
    }
  }
`
export type CreatePropMapBindingMutationFn = Apollo.MutationFunction<
  CreatePropMapBindingMutation,
  CreatePropMapBindingMutationVariables
>

/**
 * __useCreatePropMapBindingMutation__
 *
 * To run a mutation, you first call `useCreatePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPropMapBindingMutation, { data, loading, error }] = useCreatePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePropMapBindingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePropMapBindingMutation,
    CreatePropMapBindingMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreatePropMapBindingMutation,
    CreatePropMapBindingMutationVariables
  >(CreatePropMapBindingGql, options)
}
export type CreatePropMapBindingMutationHookResult = ReturnType<
  typeof useCreatePropMapBindingMutation
>
export type CreatePropMapBindingMutationResult =
  Apollo.MutationResult<CreatePropMapBindingMutation>
export type CreatePropMapBindingMutationOptions = Apollo.BaseMutationOptions<
  CreatePropMapBindingMutation,
  CreatePropMapBindingMutationVariables
>
