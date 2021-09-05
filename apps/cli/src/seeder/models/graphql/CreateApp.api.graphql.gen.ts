import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type Seeder_CreateAppMutationVariables = Types.Exact<{
  input: Types.CreateAppInput;
}>;


export type Seeder_CreateAppMutation = { createApp: { id: string } };


export const Seeder_CreateAppGql = gql`
    mutation Seeder_CreateApp($input: CreateAppInput!) {
  createApp(input: $input) {
    id
  }
}
    `;
export type Seeder_CreateAppMutationFn = Apollo.MutationFunction<Seeder_CreateAppMutation, Seeder_CreateAppMutationVariables>;

/**
 * __useSeeder_CreateAppMutation__
 *
 * To run a mutation, you first call `useSeeder_CreateAppMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeeder_CreateAppMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seederCreateAppMutation, { data, loading, error }] = useSeeder_CreateAppMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSeeder_CreateAppMutation(baseOptions?: Apollo.MutationHookOptions<Seeder_CreateAppMutation, Seeder_CreateAppMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Seeder_CreateAppMutation, Seeder_CreateAppMutationVariables>(Seeder_CreateAppGql, options);
      }
export type Seeder_CreateAppMutationHookResult = ReturnType<typeof useSeeder_CreateAppMutation>;
export type Seeder_CreateAppMutationResult = Apollo.MutationResult<Seeder_CreateAppMutation>;
export type Seeder_CreateAppMutationOptions = Apollo.BaseMutationOptions<Seeder_CreateAppMutation, Seeder_CreateAppMutationVariables>;