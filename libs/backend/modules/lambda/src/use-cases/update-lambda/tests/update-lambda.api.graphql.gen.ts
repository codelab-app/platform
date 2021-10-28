import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestUpdateLambdaMutationVariables = Types.Exact<{
  input: Types.UpdateLambdaInput;
}>;


export type TestUpdateLambdaMutation = { updateLambda?: void | null | undefined };


export const TestUpdateLambdaGql = `
    mutation TestUpdateLambda($input: UpdateLambdaInput!) {
  updateLambda(input: $input)
}
    `;
export type TestUpdateLambdaMutationFn = Apollo.MutationFunction<TestUpdateLambdaMutation, TestUpdateLambdaMutationVariables>;

/**
 * __useTestUpdateLambdaMutation__
 *
 * To run a mutation, you first call `useTestUpdateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdateLambdaMutation, { data, loading, error }] = useTestUpdateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdateLambdaMutation(baseOptions?: Apollo.MutationHookOptions<TestUpdateLambdaMutation, TestUpdateLambdaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestUpdateLambdaMutation, TestUpdateLambdaMutationVariables>(TestUpdateLambdaGql, options);
      }
export type TestUpdateLambdaMutationHookResult = ReturnType<typeof useTestUpdateLambdaMutation>;
export type TestUpdateLambdaMutationResult = Apollo.MutationResult<TestUpdateLambdaMutation>;
export type TestUpdateLambdaMutationOptions = Apollo.BaseMutationOptions<TestUpdateLambdaMutation, TestUpdateLambdaMutationVariables>;