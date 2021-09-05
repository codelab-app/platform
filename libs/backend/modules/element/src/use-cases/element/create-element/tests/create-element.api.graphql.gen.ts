import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestCreateElementMutationVariables = Types.Exact<{
  input: Types.CreateElementInput;
}>;


export type TestCreateElementMutation = { createElement: { id: string } };


export const TestCreateElementGql = gql`
    mutation TestCreateElement($input: CreateElementInput!) {
  createElement(input: $input) {
    id
  }
}
    `;
export type TestCreateElementMutationFn = Apollo.MutationFunction<TestCreateElementMutation, TestCreateElementMutationVariables>;

/**
 * __useTestCreateElementMutation__
 *
 * To run a mutation, you first call `useTestCreateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateElementMutation, { data, loading, error }] = useTestCreateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateElementMutation(baseOptions?: Apollo.MutationHookOptions<TestCreateElementMutation, TestCreateElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestCreateElementMutation, TestCreateElementMutationVariables>(TestCreateElementGql, options);
      }
export type TestCreateElementMutationHookResult = ReturnType<typeof useTestCreateElementMutation>;
export type TestCreateElementMutationResult = Apollo.MutationResult<TestCreateElementMutation>;
export type TestCreateElementMutationOptions = Apollo.BaseMutationOptions<TestCreateElementMutation, TestCreateElementMutationVariables>;