import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestUpdatePageMutationVariables = Types.Exact<{
  input: Types.UpdatePageInput;
}>;


export type TestUpdatePageMutation = { updatePage?: Types.Maybe<void> };


export const TestUpdatePageGql = gql`
    mutation TestUpdatePage($input: UpdatePageInput!) {
  updatePage(input: $input)
}
    `;
export type TestUpdatePageMutationFn = Apollo.MutationFunction<TestUpdatePageMutation, TestUpdatePageMutationVariables>;

/**
 * __useTestUpdatePageMutation__
 *
 * To run a mutation, you first call `useTestUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testUpdatePageMutation, { data, loading, error }] = useTestUpdatePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<TestUpdatePageMutation, TestUpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestUpdatePageMutation, TestUpdatePageMutationVariables>(TestUpdatePageGql, options);
      }
export type TestUpdatePageMutationHookResult = ReturnType<typeof useTestUpdatePageMutation>;
export type TestUpdatePageMutationResult = Apollo.MutationResult<TestUpdatePageMutation>;
export type TestUpdatePageMutationOptions = Apollo.BaseMutationOptions<TestUpdatePageMutation, TestUpdatePageMutationVariables>;