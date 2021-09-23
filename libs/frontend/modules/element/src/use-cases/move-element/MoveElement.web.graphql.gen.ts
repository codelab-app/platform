import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MoveElementMutationVariables = Types.Exact<{
  input: Types.MoveElementInput;
}>;


export type MoveElementMutation = { moveElement?: Types.Maybe<void> };


export const MoveElementGql = gql`
    mutation MoveElement($input: MoveElementInput!) {
  moveElement(input: $input)
}
    `;
export type MoveElementMutationFn = Apollo.MutationFunction<MoveElementMutation, MoveElementMutationVariables>;

/**
 * __useMoveElementMutation__
 *
 * To run a mutation, you first call `useMoveElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveElementMutation, { data, loading, error }] = useMoveElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveElementMutation(baseOptions?: Apollo.MutationHookOptions<MoveElementMutation, MoveElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveElementMutation, MoveElementMutationVariables>(MoveElementGql, options);
      }
export type MoveElementMutationHookResult = ReturnType<typeof useMoveElementMutation>;
export type MoveElementMutationResult = Apollo.MutationResult<MoveElementMutation>;
export type MoveElementMutationOptions = Apollo.BaseMutationOptions<MoveElementMutation, MoveElementMutationVariables>;