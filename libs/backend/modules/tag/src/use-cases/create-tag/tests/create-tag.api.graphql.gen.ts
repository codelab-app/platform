import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestCreateTagMutationVariables = Types.Exact<{
  input: Types.CreateTagInput;
}>;


export type TestCreateTagMutation = { createTag: { id: string } };


export const TestCreateTagGql = gql`
    mutation TestCreateTag($input: CreateTagInput!) {
  createTag(input: $input) {
    id
  }
}
    `;
export type TestCreateTagMutationFn = Apollo.MutationFunction<TestCreateTagMutation, TestCreateTagMutationVariables>;

/**
 * __useTestCreateTagMutation__
 *
 * To run a mutation, you first call `useTestCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateTagMutation, { data, loading, error }] = useTestCreateTagMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<TestCreateTagMutation, TestCreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestCreateTagMutation, TestCreateTagMutationVariables>(TestCreateTagGql, options);
      }
export type TestCreateTagMutationHookResult = ReturnType<typeof useTestCreateTagMutation>;
export type TestCreateTagMutationResult = Apollo.MutationResult<TestCreateTagMutation>;
export type TestCreateTagMutationOptions = Apollo.BaseMutationOptions<TestCreateTagMutation, TestCreateTagMutationVariables>;