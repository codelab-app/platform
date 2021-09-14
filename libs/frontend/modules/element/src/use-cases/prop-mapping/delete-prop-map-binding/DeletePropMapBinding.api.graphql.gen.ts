import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeletePropMapBindingMutationVariables = Types.Exact<{
  input: Types.DeletePropMapBindingInput;
}>;


export type DeletePropMapBindingMutation = { deletePropMapBinding?: Types.Maybe<void> };


export const DeletePropMapBindingGql = gql`
    mutation DeletePropMapBinding($input: DeletePropMapBindingInput!) {
  deletePropMapBinding(input: $input)
}
    `;
export type DeletePropMapBindingMutationFn = Apollo.MutationFunction<DeletePropMapBindingMutation, DeletePropMapBindingMutationVariables>;

/**
 * __useDeletePropMapBindingMutation__
 *
 * To run a mutation, you first call `useDeletePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePropMapBindingMutation, { data, loading, error }] = useDeletePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeletePropMapBindingMutation(baseOptions?: Apollo.MutationHookOptions<DeletePropMapBindingMutation, DeletePropMapBindingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePropMapBindingMutation, DeletePropMapBindingMutationVariables>(DeletePropMapBindingGql, options);
      }
export type DeletePropMapBindingMutationHookResult = ReturnType<typeof useDeletePropMapBindingMutation>;
export type DeletePropMapBindingMutationResult = Apollo.MutationResult<DeletePropMapBindingMutation>;
export type DeletePropMapBindingMutationOptions = Apollo.BaseMutationOptions<DeletePropMapBindingMutation, DeletePropMapBindingMutationVariables>;