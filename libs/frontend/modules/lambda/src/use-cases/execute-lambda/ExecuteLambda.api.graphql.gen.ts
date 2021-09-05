import * as Types from '@codelab/shared/codegen/graphql';

import { LambdaPayloadFragment } from '../../graphql/LambdaPayload.fragment.api.graphql.gen';
import { gql } from '@apollo/client';
import { LambdaPayloadFragmentDoc } from '../../graphql/LambdaPayload.fragment.api.graphql.gen';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ExecuteLambdaMutationVariables = Types.Exact<{
  input: Types.ExecuteLambdaInput;
}>;


export type ExecuteLambdaMutation = { executeLambda?: Types.Maybe<LambdaPayloadFragment> };


export const ExecuteLambdaGql = gql`
    mutation ExecuteLambda($input: ExecuteLambdaInput!) {
  executeLambda(input: $input) {
    ...LambdaPayload
  }
}
    ${LambdaPayloadFragmentDoc}`;
export type ExecuteLambdaMutationFn = Apollo.MutationFunction<ExecuteLambdaMutation, ExecuteLambdaMutationVariables>;

/**
 * __useExecuteLambdaMutation__
 *
 * To run a mutation, you first call `useExecuteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExecuteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [executeLambdaMutation, { data, loading, error }] = useExecuteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExecuteLambdaMutation(baseOptions?: Apollo.MutationHookOptions<ExecuteLambdaMutation, ExecuteLambdaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExecuteLambdaMutation, ExecuteLambdaMutationVariables>(ExecuteLambdaGql, options);
      }
export type ExecuteLambdaMutationHookResult = ReturnType<typeof useExecuteLambdaMutation>;
export type ExecuteLambdaMutationResult = Apollo.MutationResult<ExecuteLambdaMutation>;
export type ExecuteLambdaMutationOptions = Apollo.BaseMutationOptions<ExecuteLambdaMutation, ExecuteLambdaMutationVariables>;