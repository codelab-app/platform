import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ExecuteLambdaForStateMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput;
}>;


export type ExecuteLambdaForStateMutation = { executeLambda?: Types.Maybe<{ payload: string }> };


export const ExecuteLambdaForStateGql = gql`
    mutation ExecuteLambdaForState($input: ExecuteLambdaInput!) {
  executeLambda(input: $input) {
    payload
  }
}
    `;
export type ExecuteLambdaForStateMutationFn = Apollo.MutationFunction<ExecuteLambdaForStateMutation, ExecuteLambdaForStateMutationVariables>;

/**
 * __useExecuteLambdaForStateMutation__
 *
 * To run a mutation, you first call `useExecuteLambdaForStateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteLambdaForStateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeLambdaForStateMutation, { data, loading, error }] = useExecuteLambdaForStateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExecuteLambdaForStateMutation(baseOptions?: Apollo.MutationHookOptions<ExecuteLambdaForStateMutation, ExecuteLambdaForStateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExecuteLambdaForStateMutation, ExecuteLambdaForStateMutationVariables>(ExecuteLambdaForStateGql, options);
      }
export type ExecuteLambdaForStateMutationHookResult = ReturnType<typeof useExecuteLambdaForStateMutation>;
export type ExecuteLambdaForStateMutationResult = Apollo.MutationResult<ExecuteLambdaForStateMutation>;
export type ExecuteLambdaForStateMutationOptions = Apollo.BaseMutationOptions<ExecuteLambdaForStateMutation, ExecuteLambdaForStateMutationVariables>;