import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_CreateFieldMutationVariables = Types.Exact<{
  input: Types.CreateFieldInput;
}>;


export type Seeder_CreateFieldMutation = { createField: { id: string } };


export const Seeder_CreateFieldGql = gql`
    mutation Seeder_CreateField($input: CreateFieldInput!) {
  createField(input: $input) {
    id
  }
}
    `;
export type Seeder_CreateFieldMutationFn = Apollo.MutationFunction<Seeder_CreateFieldMutation, Seeder_CreateFieldMutationVariables>;

/**
 * __useSeeder_CreateFieldMutation__
 *
 * To run a mutation, you first call `useSeeder_CreateFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeeder_CreateFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seederCreateFieldMutation, { data, loading, error }] = useSeeder_CreateFieldMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_CreateFieldMutation(baseOptions?: Apollo.MutationHookOptions<Seeder_CreateFieldMutation, Seeder_CreateFieldMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Seeder_CreateFieldMutation, Seeder_CreateFieldMutationVariables>(Seeder_CreateFieldGql, options);
      }
export type Seeder_CreateFieldMutationHookResult = ReturnType<typeof useSeeder_CreateFieldMutation>;
export type Seeder_CreateFieldMutationResult = Apollo.MutationResult<Seeder_CreateFieldMutation>;
export type Seeder_CreateFieldMutationOptions = Apollo.BaseMutationOptions<Seeder_CreateFieldMutation, Seeder_CreateFieldMutationVariables>;