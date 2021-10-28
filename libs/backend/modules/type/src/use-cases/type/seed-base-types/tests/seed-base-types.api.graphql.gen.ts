import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestSeedBaseTypesMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type TestSeedBaseTypesMutation = { seedBaseTypes?: void | null | undefined };


export const TestSeedBaseTypesGql = `
    mutation TestSeedBaseTypes {
  seedBaseTypes
}
    `;
export type TestSeedBaseTypesMutationFn = Apollo.MutationFunction<TestSeedBaseTypesMutation, TestSeedBaseTypesMutationVariables>;

/**
 * __useTestSeedBaseTypesMutation__
 *
 * To run a mutation, you first call `useTestSeedBaseTypesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestSeedBaseTypesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testSeedBaseTypesMutation, { data, loading, error }] = useTestSeedBaseTypesMutation({
 *   variables: {
 *   },
 * });
 */
export function useTestSeedBaseTypesMutation(baseOptions?: Apollo.MutationHookOptions<TestSeedBaseTypesMutation, TestSeedBaseTypesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestSeedBaseTypesMutation, TestSeedBaseTypesMutationVariables>(TestSeedBaseTypesGql, options);
      }
export type TestSeedBaseTypesMutationHookResult = ReturnType<typeof useTestSeedBaseTypesMutation>;
export type TestSeedBaseTypesMutationResult = Apollo.MutationResult<TestSeedBaseTypesMutation>;
export type TestSeedBaseTypesMutationOptions = Apollo.BaseMutationOptions<TestSeedBaseTypesMutation, TestSeedBaseTypesMutationVariables>;