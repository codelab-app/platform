import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestDeleteComponentMutationVariables = Types.Exact<{
  input: Types.DeleteComponentInput;
}>;


export type TestDeleteComponentMutation = { deleteComponent?: Types.Maybe<void> };


export const TestDeleteComponentGql = gql`
    mutation TestDeleteComponent($input: DeleteComponentInput!) {
  deleteComponent(input: $input)
}
    `;
export type TestDeleteComponentMutationFn = Apollo.MutationFunction<TestDeleteComponentMutation, TestDeleteComponentMutationVariables>;

/**
 * __useTestDeleteComponentMutation__
 *
 * To run a mutation, you first call `useTestDeleteComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteComponentMutation, { data, loading, error }] = useTestDeleteComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteComponentMutation(baseOptions?: Apollo.MutationHookOptions<TestDeleteComponentMutation, TestDeleteComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestDeleteComponentMutation, TestDeleteComponentMutationVariables>(TestDeleteComponentGql, options);
      }
export type TestDeleteComponentMutationHookResult = ReturnType<typeof useTestDeleteComponentMutation>;
export type TestDeleteComponentMutationResult = Apollo.MutationResult<TestDeleteComponentMutation>;
export type TestDeleteComponentMutationOptions = Apollo.BaseMutationOptions<TestDeleteComponentMutation, TestDeleteComponentMutationVariables>;