import * as Types from '@codelab/shared/codegen/graphql';

import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput;
}>;


export type TestImportAtomsMutation = { importAtoms?: void | null | undefined };


export const TestImportAtomsGql = `
    mutation TestImportAtoms($input: ImportAtomsInput!) {
  importAtoms(input: $input)
}
    `;
export type TestImportAtomsMutationFn = Apollo.MutationFunction<TestImportAtomsMutation, TestImportAtomsMutationVariables>;

/**
 * __useTestImportAtomsMutation__
 *
 * To run a mutation, you first call `useTestImportAtomsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestImportAtomsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testImportAtomsMutation, { data, loading, error }] = useTestImportAtomsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestImportAtomsMutation(baseOptions?: Apollo.MutationHookOptions<TestImportAtomsMutation, TestImportAtomsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestImportAtomsMutation, TestImportAtomsMutationVariables>(TestImportAtomsGql, options);
      }
export type TestImportAtomsMutationHookResult = ReturnType<typeof useTestImportAtomsMutation>;
export type TestImportAtomsMutationResult = Apollo.MutationResult<TestImportAtomsMutation>;
export type TestImportAtomsMutationOptions = Apollo.BaseMutationOptions<TestImportAtomsMutation, TestImportAtomsMutationVariables>;