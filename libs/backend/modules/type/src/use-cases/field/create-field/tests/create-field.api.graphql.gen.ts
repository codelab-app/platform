import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestCreateFieldMutationVariables = Types.Exact<{
  input: Types.CreateFieldInput;
}>;


export type TestCreateFieldMutation = { createField: { id: string } };


export const TestCreateFieldGql = gql`
    mutation TestCreateField($input: CreateFieldInput!) {
  createField(input: $input) {
    id
  }
}
    `;
export type TestCreateFieldMutationFn = Apollo.MutationFunction<TestCreateFieldMutation, TestCreateFieldMutationVariables>;

/**
 * __useTestCreateFieldMutation__
 *
 * To run a mutation, you first call `useTestCreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateFieldMutation, { data, loading, error }] = useTestCreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateFieldMutation(baseOptions?: Apollo.MutationHookOptions<TestCreateFieldMutation, TestCreateFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestCreateFieldMutation, TestCreateFieldMutationVariables>(TestCreateFieldGql, options);
      }
export type TestCreateFieldMutationHookResult = ReturnType<typeof useTestCreateFieldMutation>;
export type TestCreateFieldMutationResult = Apollo.MutationResult<TestCreateFieldMutation>;
export type TestCreateFieldMutationOptions = Apollo.BaseMutationOptions<TestCreateFieldMutation, TestCreateFieldMutationVariables>;