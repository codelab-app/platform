import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestDeleteElementMutationVariables = Types.Exact<{
  input: Types.DeleteElementInput;
}>;


export type TestDeleteElementMutation = { deleteElement?: void | null | undefined };


export const TestDeleteElementGql = `
    mutation TestDeleteElement($input: DeleteElementInput!) {
  deleteElement(input: $input)
}
    `;
export type TestDeleteElementMutationFn = Apollo.MutationFunction<TestDeleteElementMutation, TestDeleteElementMutationVariables>;

/**
 * __useTestDeleteElementMutation__
 *
 * To run a mutation, you first call `useTestDeleteElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteElementMutation, { data, loading, error }] = useTestDeleteElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteElementMutation(baseOptions?: Apollo.MutationHookOptions<TestDeleteElementMutation, TestDeleteElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestDeleteElementMutation, TestDeleteElementMutationVariables>(TestDeleteElementGql, options);
      }
export type TestDeleteElementMutationHookResult = ReturnType<typeof useTestDeleteElementMutation>;
export type TestDeleteElementMutationResult = Apollo.MutationResult<TestDeleteElementMutation>;
export type TestDeleteElementMutationOptions = Apollo.BaseMutationOptions<TestDeleteElementMutation, TestDeleteElementMutationVariables>;