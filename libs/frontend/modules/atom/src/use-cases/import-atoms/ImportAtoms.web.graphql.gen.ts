import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type ImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput;
}>;


export type ImportAtomsMutation = { importAtoms?: Types.Maybe<void> };


export const ImportAtomsGql = gql`
    mutation ImportAtoms($input: ImportAtomsInput!) {
  importAtoms(input: $input)
}
    `;
export type ImportAtomsMutationFn = Apollo.MutationFunction<ImportAtomsMutation, ImportAtomsMutationVariables>;

/**
 * __useImportAtomsMutation__
 *
 * To run a mutation, you first call `useImportAtomsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportAtomsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importAtomsMutation, { data, loading, error }] = useImportAtomsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportAtomsMutation(baseOptions?: Apollo.MutationHookOptions<ImportAtomsMutation, ImportAtomsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportAtomsMutation, ImportAtomsMutationVariables>(ImportAtomsGql, options);
      }
export type ImportAtomsMutationHookResult = ReturnType<typeof useImportAtomsMutation>;
export type ImportAtomsMutationResult = Apollo.MutationResult<ImportAtomsMutation>;
export type ImportAtomsMutationOptions = Apollo.BaseMutationOptions<ImportAtomsMutation, ImportAtomsMutationVariables>;