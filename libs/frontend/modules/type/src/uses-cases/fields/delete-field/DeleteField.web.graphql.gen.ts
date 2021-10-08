import * as Types from '@codelab/frontend/abstract/codegen'

import { FieldFragment } from '../../../graphql/Field.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { FieldFragmentDoc } from '../../../graphql/Field.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type DeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput
}>

export type DeleteFieldMutation = {
  deleteField?: FieldFragment | null | undefined
}

export const DeleteFieldGql = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteField(input: $input) {
      ...Field
    }
  }
  ${FieldFragmentDoc}
`
export type DeleteFieldMutationFn = Apollo.MutationFunction<
  DeleteFieldMutation,
  DeleteFieldMutationVariables
>

/**
 * __useDeleteFieldMutation__
 *
 * To run a mutation, you first call `useDeleteFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFieldMutation, { data, loading, error }] = useDeleteFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFieldMutation,
    DeleteFieldMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteFieldMutation, DeleteFieldMutationVariables>(
    DeleteFieldGql,
    options,
  )
}
export type DeleteFieldMutationHookResult = ReturnType<
  typeof useDeleteFieldMutation
>
export type DeleteFieldMutationResult =
  Apollo.MutationResult<DeleteFieldMutation>
export type DeleteFieldMutationOptions = Apollo.BaseMutationOptions<
  DeleteFieldMutation,
  DeleteFieldMutationVariables
>
