import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_CreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput;
}>;


export type Seeder_CreateTypeMutation = { createType: { id: string } };


export const Seeder_CreateTypeGql = gql`
    mutation Seeder_CreateType($input: CreateTypeInput!) {
  createType(input: $input) {
    id
  }
}
    `;
export type Seeder_CreateTypeMutationFn = Apollo.MutationFunction<Seeder_CreateTypeMutation, Seeder_CreateTypeMutationVariables>;

/**
 * __useSeeder_CreateTypeMutation__
 *
 * To run a mutation, you first call `useSeeder_CreateTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeeder_CreateTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seederCreateTypeMutation, { data, loading, error }] = useSeeder_CreateTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_CreateTypeMutation(baseOptions?: Apollo.MutationHookOptions<Seeder_CreateTypeMutation, Seeder_CreateTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Seeder_CreateTypeMutation, Seeder_CreateTypeMutationVariables>(Seeder_CreateTypeGql, options);
      }
export type Seeder_CreateTypeMutationHookResult = ReturnType<typeof useSeeder_CreateTypeMutation>;
export type Seeder_CreateTypeMutationResult = Apollo.MutationResult<Seeder_CreateTypeMutation>;
export type Seeder_CreateTypeMutationOptions = Apollo.BaseMutationOptions<Seeder_CreateTypeMutation, Seeder_CreateTypeMutationVariables>;