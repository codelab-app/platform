import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type CreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput
}>

export type CreateTypeMutation = {
  createType:
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
}

export const CreateTypeGql = gql`
  mutation CreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      id
    }
  }
`
export type CreateTypeMutationFn = Apollo.MutationFunction<
  CreateTypeMutation,
  CreateTypeMutationVariables
>

/**
 * __useCreateTypeMutation__
 *
 * To run a mutation, you first call `useCreateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTypeMutation, { data, loading, error }] = useCreateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTypeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTypeMutation,
    CreateTypeMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateTypeMutation, CreateTypeMutationVariables>(
    CreateTypeGql,
    options,
  )
}
export type CreateTypeMutationHookResult = ReturnType<
  typeof useCreateTypeMutation
>
export type CreateTypeMutationResult = Apollo.MutationResult<CreateTypeMutation>
export type CreateTypeMutationOptions = Apollo.BaseMutationOptions<
  CreateTypeMutation,
  CreateTypeMutationVariables
>
