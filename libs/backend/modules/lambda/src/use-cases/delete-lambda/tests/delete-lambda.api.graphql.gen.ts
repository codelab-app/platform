import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaFragment } from '../../../../../../../frontend/modules/lambda/src/graphql/Lambda.fragment.graphql.gen';
import { gql } from '@apollo/client';
import { LambdaFragmentDoc } from '../../../../../../../frontend/modules/lambda/src/graphql/Lambda.fragment.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestDeleteLambdaMutationVariables = Types.Exact<{
  input: Types.DeleteLambdaInput;
}>;


export type TestDeleteLambdaMutation = { deleteLambda?: Types.Maybe<LambdaFragment> };


export const TestDeleteLambdaGql = gql`
    mutation TestDeleteLambda($input: DeleteLambdaInput!) {
  deleteLambda(input: $input) {
    ...Lambda
  }
}
    ${LambdaFragmentDoc}`;
export type TestDeleteLambdaMutationFn = Apollo.MutationFunction<TestDeleteLambdaMutation, TestDeleteLambdaMutationVariables>;

/**
 * __useTestDeleteLambdaMutation__
 *
 * To run a mutation, you first call `useTestDeleteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestDeleteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testDeleteLambdaMutation, { data, loading, error }] = useTestDeleteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestDeleteLambdaMutation(baseOptions?: Apollo.MutationHookOptions<TestDeleteLambdaMutation, TestDeleteLambdaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestDeleteLambdaMutation, TestDeleteLambdaMutationVariables>(TestDeleteLambdaGql, options);
      }
export type TestDeleteLambdaMutationHookResult = ReturnType<typeof useTestDeleteLambdaMutation>;
export type TestDeleteLambdaMutationResult = Apollo.MutationResult<TestDeleteLambdaMutation>;
export type TestDeleteLambdaMutationOptions = Apollo.BaseMutationOptions<TestDeleteLambdaMutation, TestDeleteLambdaMutationVariables>;