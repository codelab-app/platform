import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput;
}>;


export type CreateAtomMutation = { createAtom: { id: string } };


export const CreateAtomGql = gql`
    mutation CreateAtom($input: CreateAtomInput!) {
  createAtom(input: $input) {
    id
  }
}
    `;
export type CreateAtomMutationFn = Apollo.MutationFunction<CreateAtomMutation, CreateAtomMutationVariables>;

/**
 * __useCreateAtomMutation__
 *
 * To run a mutation, you first call `useCreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAtomMutation, { data, loading, error }] = useCreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAtomMutation(baseOptions?: Apollo.MutationHookOptions<CreateAtomMutation, CreateAtomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAtomMutation, CreateAtomMutationVariables>(CreateAtomGql, options);
      }
export type CreateAtomMutationHookResult = ReturnType<typeof useCreateAtomMutation>;
export type CreateAtomMutationResult = Apollo.MutationResult<CreateAtomMutation>;
export type CreateAtomMutationOptions = Apollo.BaseMutationOptions<CreateAtomMutation, CreateAtomMutationVariables>;