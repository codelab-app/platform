import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type ImportTagsMutationVariables = Types.Exact<{
  input: Types.ImportTagsInput
}>

export type ImportTagsMutation = { importTags?: void | null | undefined }

export const ImportTagsGql = gql`
  mutation ImportTags($input: ImportTagsInput!) {
    importTags(input: $input)
  }
`
export type ImportTagsMutationFn = Apollo.MutationFunction<
  ImportTagsMutation,
  ImportTagsMutationVariables
>

/**
 * __useImportTagsMutation__
 *
 * To run a mutation, you first call `useImportTagsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportTagsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importTagsMutation, { data, loading, error }] = useImportTagsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportTagsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ImportTagsMutation,
    ImportTagsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ImportTagsMutation, ImportTagsMutationVariables>(
    ImportTagsGql,
    options,
  )
}
export type ImportTagsMutationHookResult = ReturnType<
  typeof useImportTagsMutation
>
export type ImportTagsMutationResult = Apollo.MutationResult<ImportTagsMutation>
export type ImportTagsMutationOptions = Apollo.BaseMutationOptions<
  ImportTagsMutation,
  ImportTagsMutationVariables
>
