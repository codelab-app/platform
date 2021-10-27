import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestDeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput;
}>;


export type TestDeleteFieldMutation = { deleteField?: void | null | undefined };


export const TestDeleteFieldGql = gql`
    mutation TestDeleteField($input: DeleteFieldInput!) {
  deleteField(input: $input)
}
    `;
export type TestDeleteFieldMutationFn = Apollo.MutationFunction<TestDeleteFieldMutation, TestDeleteFieldMutationVariables>;

/**
 * __useTestDeleteFieldMutation__
 *
 * To run a mutation, you first call `useTestDeleteFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteFieldMutation, { data, loading, error }] = useTestDeleteFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteFieldMutation(baseOptions?: Apollo.MutationHookOptions<TestDeleteFieldMutation, TestDeleteFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestDeleteFieldMutation, TestDeleteFieldMutationVariables>(TestDeleteFieldGql, options);
      }
export type TestDeleteFieldMutationHookResult = ReturnType<typeof useTestDeleteFieldMutation>;
export type TestDeleteFieldMutationResult = Apollo.MutationResult<TestDeleteFieldMutation>;
export type TestDeleteFieldMutationOptions = Apollo.BaseMutationOptions<TestDeleteFieldMutation, TestDeleteFieldMutationVariables>;