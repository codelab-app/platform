import * as Types from '@codelab/frontend/abstract/codegen'

import { FieldFragment } from '../../../graphql/Field.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { FieldFragmentDoc } from '../../../graphql/Field.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type UpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpdateFieldInput
}>

export type UpdateFieldMutation = { updateField?: Types.Maybe<FieldFragment> }

export const UpdateFieldGql = gql`
  mutation UpdateField($input: UpdateFieldInput!) {
    updateField(input: $input) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`
export type UpdateFieldMutationFn = Apollo.MutationFunction<
  UpdateFieldMutation,
  UpdateFieldMutationVariables
>

/**
 * __useUpdateFieldMutation__
 *
 * To run a mutation, you first call `useUpdateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFieldMutation, { data, loading, error }] = useUpdateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateFieldMutation,
    UpdateFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateFieldMutation, UpdateFieldMutationVariables>(
    UpdateFieldGql,
    options,
  )
}
export type UpdateFieldMutationHookResult = ReturnType<
  typeof useUpdateFieldMutation
>
export type UpdateFieldMutationResult =
  Apollo.MutationResult<UpdateFieldMutation>
export type UpdateFieldMutationOptions = Apollo.BaseMutationOptions<
  UpdateFieldMutation,
  UpdateFieldMutationVariables
>
