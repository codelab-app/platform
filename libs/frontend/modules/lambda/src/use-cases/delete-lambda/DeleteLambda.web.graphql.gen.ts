import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type DeleteLambdaMutationVariables = Types.Exact<{
  input: Types.DeleteLambdaInput;
}>;


export type DeleteLambdaMutation = { deleteLambda?: Types.Maybe<void> };


export const DeleteLambdaGql = gql`
    mutation DeleteLambda($input: DeleteLambdaInput!) {
  deleteLambda(input: $input)
}
    `;
export type DeleteLambdaMutationFn = Apollo.MutationFunction<DeleteLambdaMutation, DeleteLambdaMutationVariables>;

/**
 * __useDeleteLambdaMutation__
 *
 * To run a mutation, you first call `useDeleteLambdaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLambdaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLambdaMutation, { data, loading, error }] = useDeleteLambdaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteLambdaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLambdaMutation, DeleteLambdaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLambdaMutation, DeleteLambdaMutationVariables>(DeleteLambdaGql, options);
      }
export type DeleteLambdaMutationHookResult = ReturnType<typeof useDeleteLambdaMutation>;
export type DeleteLambdaMutationResult = Apollo.MutationResult<DeleteLambdaMutation>;
export type DeleteLambdaMutationOptions = Apollo.BaseMutationOptions<DeleteLambdaMutation, DeleteLambdaMutationVariables>;