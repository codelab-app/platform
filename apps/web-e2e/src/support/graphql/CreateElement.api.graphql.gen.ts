import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateElementMutationVariables = Types.Exact<{
  input: Types.CreateElementInput;
}>;


export type CreateElementMutation = { createElement: { id: string } };


export const CreateElementGql = gql`
    mutation CreateElement($input: CreateElementInput!) {
  createElement(input: $input) {
    id
  }
}
    `;
export type CreateElementMutationFn = Apollo.MutationFunction<CreateElementMutation, CreateElementMutationVariables>;

/**
 * __useCreateElementMutation__
 *
 * To run a mutation, you first call `useCreateElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createElementMutation, { data, loading, error }] = useCreateElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateElementMutation(baseOptions?: Apollo.MutationHookOptions<CreateElementMutation, CreateElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateElementMutation, CreateElementMutationVariables>(CreateElementGql, options);
      }
export type CreateElementMutationHookResult = ReturnType<typeof useCreateElementMutation>;
export type CreateElementMutationResult = Apollo.MutationResult<CreateElementMutation>;
export type CreateElementMutationOptions = Apollo.BaseMutationOptions<CreateElementMutation, CreateElementMutationVariables>;