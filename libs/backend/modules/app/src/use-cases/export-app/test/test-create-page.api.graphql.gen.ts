import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type TestCreatePageForAppExportMutationVariables = Types.Exact<{
  input: Types.CreatePageInput
}>

export type TestCreatePageForAppExportMutation = {
  createPage: { id: string; rootElementId: string; name: string }
}

export const TestCreatePageForAppExportGql = gql`
  mutation TestCreatePageForAppExport($input: CreatePageInput!) {
    createPage(input: $input) {
      id
      rootElementId
      name
    }
  }
`
export type TestCreatePageForAppExportMutationFn = Apollo.MutationFunction<
  TestCreatePageForAppExportMutation,
  TestCreatePageForAppExportMutationVariables
>

/**
 * __useTestCreatePageForAppExportMutation__
 *
 * To run a mutation, you first call `useTestCreatePageForAppExportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTestCreatePageForAppExportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [testCreatePageForAppExportMutation, { data, loading, error }] = useTestCreatePageForAppExportMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTestCreatePageForAppExportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TestCreatePageForAppExportMutation,
    TestCreatePageForAppExportMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TestCreatePageForAppExportMutation,
    TestCreatePageForAppExportMutationVariables
  >(TestCreatePageForAppExportGql, options)
}
export type TestCreatePageForAppExportMutationHookResult = ReturnType<
  typeof useTestCreatePageForAppExportMutation
>
export type TestCreatePageForAppExportMutationResult =
  Apollo.MutationResult<TestCreatePageForAppExportMutation>
export type TestCreatePageForAppExportMutationOptions =
  Apollo.BaseMutationOptions<
    TestCreatePageForAppExportMutation,
    TestCreatePageForAppExportMutationVariables
  >
