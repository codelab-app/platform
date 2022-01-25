import * as Types from '@codelab/shared/abstract/codegen'

import {
  Export__Types_AppType_Fragment,
  Export__Types_ArrayType_Fragment,
  Export__Types_ElementType_Fragment,
  Export__Types_EnumType_Fragment,
  Export__Types_InterfaceType_Fragment,
  Export__Types_LambdaType_Fragment,
  Export__Types_MonacoType_Fragment,
  Export__Types_PageType_Fragment,
  Export__Types_PrimitiveType_Fragment,
  Export__Types_ReactNodeType_Fragment,
  Export__Types_RenderPropsType_Fragment,
  Export__Types_UnionType_Fragment,
} from '../../../../../../../../frontend/modules/type/src/graphql/TypeExport.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { Export__TypesFragmentDoc } from '../../../../../../../../frontend/modules/type/src/graphql/TypeExport.fragment.graphql.gen'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type ImportTypesMutationVariables = Types.Exact<{
  input: Types.ImportTypesInput
}>

export type ImportTypesMutation = {
  importTypes?: Array<{ id: string }> | null | undefined
}

export type ExportTypesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetTypesInput>
}>

export type ExportTypesQuery = {
  getTypes: Array<
    | Export__Types_AppType_Fragment
    | Export__Types_ArrayType_Fragment
    | Export__Types_ElementType_Fragment
    | Export__Types_EnumType_Fragment
    | Export__Types_InterfaceType_Fragment
    | Export__Types_LambdaType_Fragment
    | Export__Types_MonacoType_Fragment
    | Export__Types_PageType_Fragment
    | Export__Types_PrimitiveType_Fragment
    | Export__Types_ReactNodeType_Fragment
    | Export__Types_RenderPropsType_Fragment
    | Export__Types_UnionType_Fragment
  >
}

export const ImportTypesGql = gql`
  mutation ImportTypes($input: ImportTypesInput!) {
    importTypes(input: $input) {
      id
    }
  }
`
export type ImportTypesMutationFn = Apollo.MutationFunction<
  ImportTypesMutation,
  ImportTypesMutationVariables
>

/**
 * __useImportTypesMutation__
 *
 * To run a mutation, you first call `useImportTypesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImportTypesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [importTypesMutation, { data, loading, error }] = useImportTypesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useImportTypesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ImportTypesMutation,
    ImportTypesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ImportTypesMutation, ImportTypesMutationVariables>(
    ImportTypesGql,
    options,
  )
}
export type ImportTypesMutationHookResult = ReturnType<
  typeof useImportTypesMutation
>
export type ImportTypesMutationResult =
  Apollo.MutationResult<ImportTypesMutation>
export type ImportTypesMutationOptions = Apollo.BaseMutationOptions<
  ImportTypesMutation,
  ImportTypesMutationVariables
>
export const ExportTypesGql = gql`
  query ExportTypes($input: GetTypesInput) {
    getTypes(input: $input) {
      ...Export__Types
    }
  }
  ${Export__TypesFragmentDoc}
`

/**
 * __useExportTypesQuery__
 *
 * To run a query within a React component, call `useExportTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportTypesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExportTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ExportTypesQuery,
    ExportTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ExportTypesQuery, ExportTypesQueryVariables>(
    ExportTypesGql,
    options,
  )
}
export function useExportTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ExportTypesQuery,
    ExportTypesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ExportTypesQuery, ExportTypesQueryVariables>(
    ExportTypesGql,
    options,
  )
}
export type ExportTypesQueryHookResult = ReturnType<typeof useExportTypesQuery>
export type ExportTypesLazyQueryHookResult = ReturnType<
  typeof useExportTypesLazyQuery
>
export type ExportTypesQueryResult = Apollo.QueryResult<
  ExportTypesQuery,
  ExportTypesQueryVariables
>
export function refetchExportTypesQuery(variables?: ExportTypesQueryVariables) {
  return { query: ExportTypesGql, variables: variables }
}
