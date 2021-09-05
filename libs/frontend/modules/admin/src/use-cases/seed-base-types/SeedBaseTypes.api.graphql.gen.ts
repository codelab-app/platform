import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SeedBaseTypesMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type SeedBaseTypesMutation = { seedBaseTypes?: Types.Maybe<void> };


export const SeedBaseTypesGql = gql`
    mutation SeedBaseTypes {
  seedBaseTypes
}
    `;
export type SeedBaseTypesMutationFn = Apollo.MutationFunction<SeedBaseTypesMutation, SeedBaseTypesMutationVariables>;

/**
 * __useSeedBaseTypesMutation__
 *
 * To run a mutation, you first call `useSeedBaseTypesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSeedBaseTypesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [seedBaseTypesMutation, { data, loading, error }] = useSeedBaseTypesMutation({
 *   variables: {
 *   },
 * });
 */
export function useSeedBaseTypesMutation(baseOptions?: Apollo.MutationHookOptions<SeedBaseTypesMutation, SeedBaseTypesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SeedBaseTypesMutation, SeedBaseTypesMutationVariables>(SeedBaseTypesGql, options);
      }
export type SeedBaseTypesMutationHookResult = ReturnType<typeof useSeedBaseTypesMutation>;
export type SeedBaseTypesMutationResult = Apollo.MutationResult<SeedBaseTypesMutation>;
export type SeedBaseTypesMutationOptions = Apollo.BaseMutationOptions<SeedBaseTypesMutation, SeedBaseTypesMutationVariables>;