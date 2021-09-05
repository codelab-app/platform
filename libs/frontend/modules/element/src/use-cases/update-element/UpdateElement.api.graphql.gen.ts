import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateElementMutationVariables = Types.Exact<{
  input: Types.UpdateElementInput;
}>;


export type UpdateElementMutation = { updateElement?: Types.Maybe<void> };


export const UpdateElementGql = gql`
    mutation UpdateElement($input: UpdateElementInput!) {
  updateElement(input: $input)
}
    `;
export type UpdateElementMutationFn = Apollo.MutationFunction<UpdateElementMutation, UpdateElementMutationVariables>;

/**
 * __useUpdateElementMutation__
 *
 * To run a mutation, you first call `useUpdateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementMutation, { data, loading, error }] = useUpdateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateElementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateElementMutation, UpdateElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateElementMutation, UpdateElementMutationVariables>(UpdateElementGql, options);
      }
export type UpdateElementMutationHookResult = ReturnType<typeof useUpdateElementMutation>;
export type UpdateElementMutationResult = Apollo.MutationResult<UpdateElementMutation>;
export type UpdateElementMutationOptions = Apollo.BaseMutationOptions<UpdateElementMutation, UpdateElementMutationVariables>;