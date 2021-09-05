import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestCreateLambdaMutationVariables = Types.Exact<{
  input: Types.CreateLambdaInput;
}>;


export type TestCreateLambdaMutation = { createLambda: { id: string } };


export const TestCreateLambdaGql = gql`
    mutation TestCreateLambda($input: CreateLambdaInput!) {
  createLambda(input: $input) {
    id
  }
}
    `;
export type TestCreateLambdaMutationFn = Apollo.MutationFunction<TestCreateLambdaMutation, TestCreateLambdaMutationVariables>;

/**
 * __useTestCreateLambdaMutation__
 *
 * To run a mutation, you first call `useTestCreateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreateLambdaMutation, { data, loading, error }] = useTestCreateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreateLambdaMutation(baseOptions?: Apollo.MutationHookOptions<TestCreateLambdaMutation, TestCreateLambdaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestCreateLambdaMutation, TestCreateLambdaMutationVariables>(TestCreateLambdaGql, options);
      }
export type TestCreateLambdaMutationHookResult = ReturnType<typeof useTestCreateLambdaMutation>;
export type TestCreateLambdaMutationResult = Apollo.MutationResult<TestCreateLambdaMutation>;
export type TestCreateLambdaMutationOptions = Apollo.BaseMutationOptions<TestCreateLambdaMutation, TestCreateLambdaMutationVariables>;