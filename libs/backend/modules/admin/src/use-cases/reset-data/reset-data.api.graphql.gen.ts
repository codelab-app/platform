import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestResetDataMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type TestResetDataMutation = { resetData?: void | null | undefined };


export const TestResetDataGql = `
    mutation TestResetData {
  resetData
}
    `;
export type TestResetDataMutationFn = Apollo.MutationFunction<TestResetDataMutation, TestResetDataMutationVariables>;

/**
 * __useTestResetDataMutation__
 *
 * To run a mutation, you first call `useTestResetDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestResetDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testResetDataMutation, { data, loading, error }] = useTestResetDataMutation({
 *   variables: {
 *   },
 * });
 */
export function useTestResetDataMutation(baseOptions?: Apollo.MutationHookOptions<TestResetDataMutation, TestResetDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestResetDataMutation, TestResetDataMutationVariables>(TestResetDataGql, options);
      }
export type TestResetDataMutationHookResult = ReturnType<typeof useTestResetDataMutation>;
export type TestResetDataMutationResult = Apollo.MutationResult<TestResetDataMutation>;
export type TestResetDataMutationOptions = Apollo.BaseMutationOptions<TestResetDataMutation, TestResetDataMutationVariables>;