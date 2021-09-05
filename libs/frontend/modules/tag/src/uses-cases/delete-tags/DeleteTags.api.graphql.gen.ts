import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteTagsMutationVariables = Types.Exact<{
  input: Types.DeleteTagsInput;
}>;


export type DeleteTagsMutation = { deleteTags?: Types.Maybe<void> };


export const DeleteTagsGql = gql`
    mutation DeleteTags($input: DeleteTagsInput!) {
  deleteTags(input: $input)
}
    `;
export type DeleteTagsMutationFn = Apollo.MutationFunction<DeleteTagsMutation, DeleteTagsMutationVariables>;

/**
 * __useDeleteTagsMutation__
 *
 * To run a mutation, you first call `useDeleteTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagsMutation, { data, loading, error }] = useDeleteTagsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTagsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagsMutation, DeleteTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagsMutation, DeleteTagsMutationVariables>(DeleteTagsGql, options);
      }
export type DeleteTagsMutationHookResult = ReturnType<typeof useDeleteTagsMutation>;
export type DeleteTagsMutationResult = Apollo.MutationResult<DeleteTagsMutation>;
export type DeleteTagsMutationOptions = Apollo.BaseMutationOptions<DeleteTagsMutation, DeleteTagsMutationVariables>;