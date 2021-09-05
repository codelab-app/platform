import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestDeleteTypeMutationVariables = Types.Exact<{
  input: Types.DeleteTypeInput;
}>;


export type TestDeleteTypeMutation = { deleteType?: Types.Maybe<void> };


export const TestDeleteTypeGql = gql`
    mutation TestDeleteType($input: DeleteTypeInput!) {
  deleteType(input: $input)
}
    `;
export type TestDeleteTypeMutationFn = Apollo.MutationFunction<TestDeleteTypeMutation, TestDeleteTypeMutationVariables>;

/**
 * __useTestDeleteTypeMutation__
 *
 * To run a mutation, you first call `useTestDeleteTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteTypeMutation, { data, loading, error }] = useTestDeleteTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteTypeMutation(baseOptions?: Apollo.MutationHookOptions<TestDeleteTypeMutation, TestDeleteTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestDeleteTypeMutation, TestDeleteTypeMutationVariables>(TestDeleteTypeGql, options);
      }
export type TestDeleteTypeMutationHookResult = ReturnType<typeof useTestDeleteTypeMutation>;
export type TestDeleteTypeMutationResult = Apollo.MutationResult<TestDeleteTypeMutation>;
export type TestDeleteTypeMutationOptions = Apollo.BaseMutationOptions<TestDeleteTypeMutation, TestDeleteTypeMutationVariables>;