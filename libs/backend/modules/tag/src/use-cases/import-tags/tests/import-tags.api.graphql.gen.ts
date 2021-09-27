import * as Types from '@codelab/shared/codegen/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TestImportTagsMutationVariables = Types.Exact<{
  input: Types.ImportTagsInput;
}>;


export type TestImportTagsMutation = { importTags?: Types.Maybe<void> };


export const TestImportTagsGql = gql`
    mutation TestImportTags($input: ImportTagsInput!) {
  importTags(input: $input)
}
    `;
export type TestImportTagsMutationFn = Apollo.MutationFunction<TestImportTagsMutation, TestImportTagsMutationVariables>;

/**
 * __useTestImportTagsMutation__
 *
 * To run a mutation, you first call `useTestImportTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestImportTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testImportTagsMutation, { data, loading, error }] = useTestImportTagsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestImportTagsMutation(baseOptions?: Apollo.MutationHookOptions<TestImportTagsMutation, TestImportTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TestImportTagsMutation, TestImportTagsMutationVariables>(TestImportTagsGql, options);
      }
export type TestImportTagsMutationHookResult = ReturnType<typeof useTestImportTagsMutation>;
export type TestImportTagsMutationResult = Apollo.MutationResult<TestImportTagsMutation>;
export type TestImportTagsMutationOptions = Apollo.BaseMutationOptions<TestImportTagsMutation, TestImportTagsMutationVariables>;