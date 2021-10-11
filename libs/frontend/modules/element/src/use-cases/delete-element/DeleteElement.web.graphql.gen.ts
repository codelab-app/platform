import * as Types from '@codelab/shared/codegen/graphql';

import { ElementFragment } from '../../graphql/Element.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { ElementFragmentDoc } from '../../graphql/Element.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteElementMutationVariables = Types.Exact<{
  input: Types.DeleteElementInput;
}>;


export type DeleteElementMutation = { deleteElement?: Types.Maybe<ElementFragment> };


export const DeleteElementGql = gql`
    mutation DeleteElement($input: DeleteElementInput!) {
  deleteElement(input: $input) {
    ...Element
  }
}
    ${ElementFragmentDoc}`;
export type DeleteElementMutationFn = Apollo.MutationFunction<DeleteElementMutation, DeleteElementMutationVariables>;

/**
 * __useDeleteElementMutation__
 *
 * To run a mutation, you first call `useDeleteElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteElementMutation, { data, loading, error }] = useDeleteElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteElementMutation(baseOptions?: Apollo.MutationHookOptions<DeleteElementMutation, DeleteElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteElementMutation, DeleteElementMutationVariables>(DeleteElementGql, options);
      }
export type DeleteElementMutationHookResult = ReturnType<typeof useDeleteElementMutation>;
export type DeleteElementMutationResult = Apollo.MutationResult<DeleteElementMutation>;
export type DeleteElementMutationOptions = Apollo.BaseMutationOptions<DeleteElementMutation, DeleteElementMutationVariables>;