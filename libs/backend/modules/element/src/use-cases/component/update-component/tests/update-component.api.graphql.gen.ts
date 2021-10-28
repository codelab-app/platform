import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestUpdateComponentMutationVariables = Types.Exact<{
  input: Types.UpdateComponentInput;
}>;


export type TestUpdateComponentMutation = { updateComponent?: void | null | undefined };


export const TestUpdateComponentGql = `
    mutation TestUpdateComponent($input: UpdateComponentInput!) {
  updateComponent(input: $input)
}
    `;
export type TestUpdateComponentMutationFn = Apollo.MutationFunction<TestUpdateComponentMutation, TestUpdateComponentMutationVariables>;

/**
 * __useTestUpdateComponentMutation__
 *
 * To run a mutation, you first call `useTestUpdateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateComponentMutation, { data, loading, error }] = useTestUpdateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateComponentMutation(baseOptions?: Apollo.MutationHookOptions<TestUpdateComponentMutation, TestUpdateComponentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestUpdateComponentMutation, TestUpdateComponentMutationVariables>(TestUpdateComponentGql, options);
      }
export type TestUpdateComponentMutationHookResult = ReturnType<typeof useTestUpdateComponentMutation>;
export type TestUpdateComponentMutationResult = Apollo.MutationResult<TestUpdateComponentMutation>;
export type TestUpdateComponentMutationOptions = Apollo.BaseMutationOptions<TestUpdateComponentMutation, TestUpdateComponentMutationVariables>;