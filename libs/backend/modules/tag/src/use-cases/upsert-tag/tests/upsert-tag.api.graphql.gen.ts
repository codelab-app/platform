import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestUpsertTagMutationVariables = Types.Exact<{
  input: Types.UpsertTagInput;
}>;


export type TestUpsertTagMutation = { upsertTag: void };


export const TestUpsertTagGql = `
    mutation TestUpsertTag($input: UpsertTagInput!) {
  upsertTag(input: $input)
}
    `;
export type TestUpsertTagMutationFn = Apollo.MutationFunction<TestUpsertTagMutation, TestUpsertTagMutationVariables>;

/**
 * __useTestUpsertTagMutation__
 *
 * To run a mutation, you first call `useTestUpsertTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpsertTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpsertTagMutation, { data, loading, error }] = useTestUpsertTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpsertTagMutation(baseOptions?: Apollo.MutationHookOptions<TestUpsertTagMutation, TestUpsertTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestUpsertTagMutation, TestUpsertTagMutationVariables>(TestUpsertTagGql, options);
      }
export type TestUpsertTagMutationHookResult = ReturnType<typeof useTestUpsertTagMutation>;
export type TestUpsertTagMutationResult = Apollo.MutationResult<TestUpsertTagMutation>;
export type TestUpsertTagMutationOptions = Apollo.BaseMutationOptions<TestUpsertTagMutation, TestUpsertTagMutationVariables>;