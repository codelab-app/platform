import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_CreateAtomMutationVariables = Types.Exact<{
  input: Types.CreateAtomInput;
}>;


export type Seeder_CreateAtomMutation = { createAtom: { id: string } };


export const Seeder_CreateAtomGql = gql`
    mutation Seeder_CreateAtom($input: CreateAtomInput!) {
  createAtom(input: $input) {
    id
  }
}
    `;
export type Seeder_CreateAtomMutationFn = Apollo.MutationFunction<Seeder_CreateAtomMutation, Seeder_CreateAtomMutationVariables>;

/**
 * __useSeeder_CreateAtomMutation__
 *
 * To run a mutation, you first call `useSeeder_CreateAtomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeeder_CreateAtomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seederCreateAtomMutation, { data, loading, error }] = useSeeder_CreateAtomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_CreateAtomMutation(baseOptions?: Apollo.MutationHookOptions<Seeder_CreateAtomMutation, Seeder_CreateAtomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Seeder_CreateAtomMutation, Seeder_CreateAtomMutationVariables>(Seeder_CreateAtomGql, options);
      }
export type Seeder_CreateAtomMutationHookResult = ReturnType<typeof useSeeder_CreateAtomMutation>;
export type Seeder_CreateAtomMutationResult = Apollo.MutationResult<Seeder_CreateAtomMutation>;
export type Seeder_CreateAtomMutationOptions = Apollo.BaseMutationOptions<Seeder_CreateAtomMutation, Seeder_CreateAtomMutationVariables>;