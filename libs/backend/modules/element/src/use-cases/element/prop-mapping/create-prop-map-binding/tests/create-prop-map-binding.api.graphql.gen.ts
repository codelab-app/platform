import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestCreatePropMapBindingMutationVariables = Types.Exact<{
  input: Types.CreatePropMapBindingInput;
}>;


export type TestCreatePropMapBindingMutation = { createPropMapBinding: { id: string } };


export const TestCreatePropMapBindingGql = gql`
    mutation TestCreatePropMapBinding($input: CreatePropMapBindingInput!) {
  createPropMapBinding(input: $input) {
    id
  }
}
    `;
export type TestCreatePropMapBindingMutationFn = Apollo.MutationFunction<TestCreatePropMapBindingMutation, TestCreatePropMapBindingMutationVariables>;

/**
 * __useTestCreatePropMapBindingMutation__
 *
 * To run a mutation, you first call `useTestCreatePropMapBindingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreatePropMapBindingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreatePropMapBindingMutation, { data, loading, error }] = useTestCreatePropMapBindingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreatePropMapBindingMutation(baseOptions?: Apollo.MutationHookOptions<TestCreatePropMapBindingMutation, TestCreatePropMapBindingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestCreatePropMapBindingMutation, TestCreatePropMapBindingMutationVariables>(TestCreatePropMapBindingGql, options);
      }
export type TestCreatePropMapBindingMutationHookResult = ReturnType<typeof useTestCreatePropMapBindingMutation>;
export type TestCreatePropMapBindingMutationResult = Apollo.MutationResult<TestCreatePropMapBindingMutation>;
export type TestCreatePropMapBindingMutationOptions = Apollo.BaseMutationOptions<TestCreatePropMapBindingMutation, TestCreatePropMapBindingMutationVariables>;