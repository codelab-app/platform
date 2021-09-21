import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type UpdateLambdaMutationVariables = Types.Exact<{
  input: Types.UpdateLambdaInput;
}>;


export type UpdateLambdaMutation = { updateLambda?: Types.Maybe<void> };


export const UpdateLambdaGql = gql`
    mutation UpdateLambda($input: UpdateLambdaInput!) {
  updateLambda(input: $input)
}
    `;
export type UpdateLambdaMutationFn = Apollo.MutationFunction<UpdateLambdaMutation, UpdateLambdaMutationVariables>;

/**
 * __useUpdateLambdaMutation__
 *
 * To run a mutation, you first call `useUpdateLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLambdaMutation, { data, loading, error }] = useUpdateLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLambdaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLambdaMutation, UpdateLambdaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLambdaMutation, UpdateLambdaMutationVariables>(UpdateLambdaGql, options);
      }
export type UpdateLambdaMutationHookResult = ReturnType<typeof useUpdateLambdaMutation>;
export type UpdateLambdaMutationResult = Apollo.MutationResult<UpdateLambdaMutation>;
export type UpdateLambdaMutationOptions = Apollo.BaseMutationOptions<UpdateLambdaMutation, UpdateLambdaMutationVariables>;