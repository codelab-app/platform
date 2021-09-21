import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type RemoveHookFromElementMutationVariables = Types.Exact<{
  input: Types.RemoveHookFromElementInput;
}>;


export type RemoveHookFromElementMutation = { removeHookFromElement?: Types.Maybe<void> };


export const RemoveHookFromElementGql = gql`
    mutation RemoveHookFromElement($input: RemoveHookFromElementInput!) {
  removeHookFromElement(input: $input)
}
    `;
export type RemoveHookFromElementMutationFn = Apollo.MutationFunction<RemoveHookFromElementMutation, RemoveHookFromElementMutationVariables>;

/**
 * __useRemoveHookFromElementMutation__
 *
 * To run a mutation, you first call `useRemoveHookFromElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveHookFromElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeHookFromElementMutation, { data, loading, error }] = useRemoveHookFromElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveHookFromElementMutation(baseOptions?: Apollo.MutationHookOptions<RemoveHookFromElementMutation, RemoveHookFromElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveHookFromElementMutation, RemoveHookFromElementMutationVariables>(RemoveHookFromElementGql, options);
      }
export type RemoveHookFromElementMutationHookResult = ReturnType<typeof useRemoveHookFromElementMutation>;
export type RemoveHookFromElementMutationResult = Apollo.MutationResult<RemoveHookFromElementMutation>;
export type RemoveHookFromElementMutationOptions = Apollo.BaseMutationOptions<RemoveHookFromElementMutation, RemoveHookFromElementMutationVariables>;