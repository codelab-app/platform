import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type AddHookToElementMutationVariables = Types.Exact<{
  input: Types.AddHookToElementInput;
}>;


export type AddHookToElementMutation = { addHookToElement: { id: string } };


export const AddHookToElementGql = gql`
    mutation AddHookToElement($input: AddHookToElementInput!) {
  addHookToElement(input: $input) {
    id
  }
}
    `;
export type AddHookToElementMutationFn = Apollo.MutationFunction<AddHookToElementMutation, AddHookToElementMutationVariables>;

/**
 * __useAddHookToElementMutation__
 *
 * To run a mutation, you first call `useAddHookToElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHookToElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHookToElementMutation, { data, loading, error }] = useAddHookToElementMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddHookToElementMutation(baseOptions?: Apollo.MutationHookOptions<AddHookToElementMutation, AddHookToElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddHookToElementMutation, AddHookToElementMutationVariables>(AddHookToElementGql, options);
      }
export type AddHookToElementMutationHookResult = ReturnType<typeof useAddHookToElementMutation>;
export type AddHookToElementMutationResult = Apollo.MutationResult<AddHookToElementMutation>;
export type AddHookToElementMutationOptions = Apollo.BaseMutationOptions<AddHookToElementMutation, AddHookToElementMutationVariables>;