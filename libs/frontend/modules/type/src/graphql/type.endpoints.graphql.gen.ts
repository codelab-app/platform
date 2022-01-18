import * as Types from '@codelab/frontend/abstract/codegen'

import {
  Export__Types_AppType_Fragment,
  Export__Types_ArrayType_Fragment,
  Export__Types_ComponentType_Fragment,
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
} from './TypeExport.fragment.graphql.gen'
import { TypeGraphFragment } from './TypeGraph.fragment.graphql.gen'
import {
  Type_AppType_Fragment,
  Type_ArrayType_Fragment,
  Type_ComponentType_Fragment,
  Type_ElementType_Fragment,
  Type_EnumType_Fragment,
  Type_InterfaceType_Fragment,
  Type_LambdaType_Fragment,
  Type_MonacoType_Fragment,
  Type_PageType_Fragment,
  Type_PrimitiveType_Fragment,
  Type_ReactNodeType_Fragment,
  Type_RenderPropsType_Fragment,
  Type_UnionType_Fragment,
} from './Type.fragment.graphql.gen'
import { EnumTypeFragment } from './EnumType.fragment.graphql.gen'
import { PrimitiveTypeFragment } from './PrimitiveType.fragment.graphql.gen'
import { UnionTypeFragment } from './UnionType.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { Export__TypesFragmentDoc } from './TypeExport.fragment.graphql.gen'
import { TypeGraphFragmentDoc } from './TypeGraph.fragment.graphql.gen'
import { TypeFragmentDoc } from './Type.fragment.graphql.gen'
import { EnumTypeFragmentDoc } from './EnumType.fragment.graphql.gen'
import { PrimitiveTypeFragmentDoc } from './PrimitiveType.fragment.graphql.gen'
import { UnionTypeFragmentDoc } from './UnionType.fragment.graphql.gen'
import { api, GraphqlOperationOptions } from '@codelab/frontend/model/infra/api'
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
    | Export__Types_ComponentType_Fragment
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

export type CreateTypeMutationVariables = Types.Exact<{
  input: Types.CreateTypeInput
}>

export type CreateTypeMutation = {
  createType:
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
    | { id: string }
}

export type DeleteTypeMutationVariables = Types.Exact<{
  input: Types.DeleteTypeInput
}>

export type DeleteTypeMutation = {
  deleteType?:
    | Type_AppType_Fragment
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_MonacoType_Fragment
    | Type_PageType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
    | null
    | undefined
}

export type GetTypeQueryVariables = Types.Exact<{
  input: Types.GetTypeInput
}>

export type GetTypeQuery = {
  getType?:
    | Type_AppType_Fragment
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_MonacoType_Fragment
    | Type_PageType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
    | null
    | undefined
}

export type GetTypeGraphQueryVariables = Types.Exact<{
  input: Types.GetTypeGraphInput
}>

export type GetTypeGraphQuery = {
  getTypeGraph?: TypeGraphFragment | null | undefined
}

export type GetTypesQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetTypesInput>
}>

export type GetTypesQuery = {
  getTypes: Array<
    | ({ __typename: 'AppType' } & Type_AppType_Fragment)
    | ({ __typename: 'ArrayType' } & Type_ArrayType_Fragment)
    | ({ __typename: 'ComponentType' } & Type_ComponentType_Fragment)
    | ({ __typename: 'ElementType' } & Type_ElementType_Fragment)
    | ({ __typename: 'EnumType' } & Type_EnumType_Fragment)
    | ({ __typename: 'InterfaceType' } & Type_InterfaceType_Fragment)
    | ({ __typename: 'LambdaType' } & Type_LambdaType_Fragment)
    | ({ __typename: 'MonacoType' } & Type_MonacoType_Fragment)
    | ({ __typename: 'PageType' } & Type_PageType_Fragment)
    | ({ __typename: 'PrimitiveType' } & Type_PrimitiveType_Fragment)
    | ({ __typename: 'ReactNodeType' } & Type_ReactNodeType_Fragment)
    | ({ __typename: 'RenderPropsType' } & Type_RenderPropsType_Fragment)
    | ({ __typename: 'UnionType' } & Type_UnionType_Fragment)
  >
}

export type UpdateEnumTypeMutationVariables = Types.Exact<{
  input: Types.UpdateEnumTypeInput
}>

export type UpdateEnumTypeMutation = {
  updateEnumType?: EnumTypeFragment | null | undefined
}

export type UpdateTypeMutationVariables = Types.Exact<{
  input: Types.UpdateTypeInput
}>

export type UpdateTypeMutation = {
  updateType?:
    | Type_AppType_Fragment
    | Type_ArrayType_Fragment
    | Type_ComponentType_Fragment
    | Type_ElementType_Fragment
    | Type_EnumType_Fragment
    | Type_InterfaceType_Fragment
    | Type_LambdaType_Fragment
    | Type_MonacoType_Fragment
    | Type_PageType_Fragment
    | Type_PrimitiveType_Fragment
    | Type_ReactNodeType_Fragment
    | Type_RenderPropsType_Fragment
    | Type_UnionType_Fragment
    | null
    | undefined
}

export type UpdatePrimitiveTypeMutationVariables = Types.Exact<{
  input: Types.UpdatePrimitiveTypeInput
}>

export type UpdatePrimitiveTypeMutation = {
  updatePrimitiveType?: PrimitiveTypeFragment | null | undefined
}

export type UpdateUnionTypeMutationVariables = Types.Exact<{
  input: Types.UpdateUnionTypeInput
}>

export type UpdateUnionTypeMutation = {
  updateUnionType?: UnionTypeFragment | null | undefined
}

export type GetTypeKindsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetTypesInput>
}>

export type GetTypeKindsQuery = {
  getTypes: Array<
    | { __typename: 'AppType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ArrayType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ComponentType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ElementType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'EnumType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'InterfaceType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'LambdaType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'MonacoType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'PageType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'PrimitiveType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'ReactNodeType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'RenderPropsType'; id: string; typeKind: Types.TypeKind }
    | { __typename: 'UnionType'; id: string; typeKind: Types.TypeKind }
  >
}

export type GetPagesForSelectQueryVariables = Types.Exact<{
  input: Types.GetPagesInput
}>

export type GetPagesForSelectQuery = {
  pages: Array<{ id: string; name: string }>
}

export type GetLambdasForSelectQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetLambdasForSelectQuery = {
  getLambdas: Array<{ id: string; name: string }>
}

export type ComponentForSelectFragment = {
  id: string
  name?: string | null | undefined
  componentTag?: { name: string } | null | undefined
}

export type GetComponentsForSelectQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetComponentsInput>
}>

export type GetComponentsForSelectQuery = {
  getComponents: Array<ComponentForSelectFragment>
}

export type AtomForSelectFragment = {
  id: string
  name: string
  type: Types.AtomType
}

export type GetAtomsForSelectQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.GetAtomsInput>
}>

export type GetAtomsForSelectQuery = {
  getAtoms?: Array<AtomForSelectFragment> | null | undefined
}

export type GetAtomsTypeHookForSelectQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetAtomsTypeHookForSelectQuery = {
  getAtomsTypeHook?: Array<AtomForSelectFragment> | null | undefined
}

export const ComponentForSelectFragmentDoc = gql`
  fragment ComponentForSelect on Element {
    id
    name
    componentTag {
      name
    }
  }
`
export const AtomForSelectFragmentDoc = gql`
  fragment AtomForSelect on Atom {
    id
    name
    type
  }
`
export const ImportTypesGql = gql`
  mutation ImportTypes($input: ImportTypesInput!) {
    importTypes(input: $input) {
      id
    }
  }
`
export const ExportTypesGql = gql`
  query ExportTypes($input: GetTypesInput) {
    getTypes(input: $input) {
      ...Export__Types
    }
  }
  ${Export__TypesFragmentDoc}
`
export const CreateTypeGql = gql`
  mutation CreateType($input: CreateTypeInput!) {
    createType(input: $input) {
      id
    }
  }
`
export const DeleteTypeGql = gql`
  mutation DeleteType($input: DeleteTypeInput!) {
    deleteType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetTypeGql = gql`
  query GetType($input: GetTypeInput!) {
    getType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const GetTypeGraphGql = gql`
  query GetTypeGraph($input: GetTypeGraphInput!) {
    getTypeGraph(input: $input) {
      ...TypeGraph
    }
  }
  ${TypeGraphFragmentDoc}
`
export const GetTypesGql = gql`
  query GetTypes($input: GetTypesInput) {
    getTypes(input: $input) {
      __typename
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const UpdateEnumTypeGql = gql`
  mutation UpdateEnumType($input: UpdateEnumTypeInput!) {
    updateEnumType(input: $input) {
      ...EnumType
    }
  }
  ${EnumTypeFragmentDoc}
`
export const UpdateTypeGql = gql`
  mutation UpdateType($input: UpdateTypeInput!) {
    updateType(input: $input) {
      ...Type
    }
  }
  ${TypeFragmentDoc}
`
export const UpdatePrimitiveTypeGql = gql`
  mutation UpdatePrimitiveType($input: UpdatePrimitiveTypeInput!) {
    updatePrimitiveType(input: $input) {
      ...PrimitiveType
    }
  }
  ${PrimitiveTypeFragmentDoc}
`
export const UpdateUnionTypeGql = gql`
  mutation UpdateUnionType($input: UpdateUnionTypeInput!) {
    updateUnionType(input: $input) {
      ...UnionType
    }
  }
  ${UnionTypeFragmentDoc}
`
export const GetTypeKindsGql = gql`
  query GetTypeKinds($input: GetTypesInput) {
    getTypes(input: $input) {
      id
      typeKind
      __typename
    }
  }
`
export const GetPagesForSelectGql = gql`
  query GetPagesForSelect($input: GetPagesInput!) {
    pages: getPages(input: $input) {
      id
      name
    }
  }
`
export const GetLambdasForSelectGql = gql`
  query GetLambdasForSelect {
    getLambdas {
      id
      name
    }
  }
`
export const GetComponentsForSelectGql = gql`
  query GetComponentsForSelect($input: GetComponentsInput) {
    getComponents(input: $input) {
      ...ComponentForSelect
    }
  }
  ${ComponentForSelectFragmentDoc}
`
export const GetAtomsForSelectGql = gql`
  query GetAtomsForSelect($input: GetAtomsInput) {
    getAtoms(input: $input) {
      ...AtomForSelect
    }
  }
  ${AtomForSelectFragmentDoc}
`
export const GetAtomsTypeHookForSelectGql = gql`
  query GetAtomsTypeHookForSelect {
    getAtomsTypeHook {
      ...AtomForSelect
    }
  }
  ${AtomForSelectFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    ImportTypes: build.mutation<
      ImportTypesMutation,
      GraphqlOperationOptions<ImportTypesMutationVariables>
    >({
      query: (options) => ({
        document: ImportTypesGql,
        options: options ?? undefined,
      }),
    }),
    ExportTypes: build.query<
      ExportTypesQuery,
      GraphqlOperationOptions<ExportTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: ExportTypesGql,
        options: options ?? undefined,
      }),
    }),
    CreateType: build.mutation<
      CreateTypeMutation,
      GraphqlOperationOptions<CreateTypeMutationVariables>
    >({
      query: (options) => ({
        document: CreateTypeGql,
        options: options ?? undefined,
      }),
    }),
    DeleteType: build.mutation<
      DeleteTypeMutation,
      GraphqlOperationOptions<DeleteTypeMutationVariables>
    >({
      query: (options) => ({
        document: DeleteTypeGql,
        options: options ?? undefined,
      }),
    }),
    GetType: build.query<
      GetTypeQuery,
      GraphqlOperationOptions<GetTypeQueryVariables>
    >({
      query: (options) => ({
        document: GetTypeGql,
        options: options ?? undefined,
      }),
    }),
    GetTypeGraph: build.query<
      GetTypeGraphQuery,
      GraphqlOperationOptions<GetTypeGraphQueryVariables>
    >({
      query: (options) => ({
        document: GetTypeGraphGql,
        options: options ?? undefined,
      }),
    }),
    GetTypes: build.query<
      GetTypesQuery,
      GraphqlOperationOptions<GetTypesQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTypesGql,
        options: options ?? undefined,
      }),
    }),
    UpdateEnumType: build.mutation<
      UpdateEnumTypeMutation,
      GraphqlOperationOptions<UpdateEnumTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdateEnumTypeGql,
        options: options ?? undefined,
      }),
    }),
    UpdateType: build.mutation<
      UpdateTypeMutation,
      GraphqlOperationOptions<UpdateTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdateTypeGql,
        options: options ?? undefined,
      }),
    }),
    UpdatePrimitiveType: build.mutation<
      UpdatePrimitiveTypeMutation,
      GraphqlOperationOptions<UpdatePrimitiveTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdatePrimitiveTypeGql,
        options: options ?? undefined,
      }),
    }),
    UpdateUnionType: build.mutation<
      UpdateUnionTypeMutation,
      GraphqlOperationOptions<UpdateUnionTypeMutationVariables>
    >({
      query: (options) => ({
        document: UpdateUnionTypeGql,
        options: options ?? undefined,
      }),
    }),
    GetTypeKinds: build.query<
      GetTypeKindsQuery,
      GraphqlOperationOptions<GetTypeKindsQueryVariables> | void | undefined
    >({
      query: (options) => ({
        document: GetTypeKindsGql,
        options: options ?? undefined,
      }),
    }),
    GetPagesForSelect: build.query<
      GetPagesForSelectQuery,
      GraphqlOperationOptions<GetPagesForSelectQueryVariables>
    >({
      query: (options) => ({
        document: GetPagesForSelectGql,
        options: options ?? undefined,
      }),
    }),
    GetLambdasForSelect: build.query<
      GetLambdasForSelectQuery,
      | GraphqlOperationOptions<GetLambdasForSelectQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetLambdasForSelectGql,
        options: options ?? undefined,
      }),
    }),
    GetComponentsForSelect: build.query<
      GetComponentsForSelectQuery,
      | GraphqlOperationOptions<GetComponentsForSelectQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetComponentsForSelectGql,
        options: options ?? undefined,
      }),
    }),
    GetAtomsForSelect: build.query<
      GetAtomsForSelectQuery,
      | GraphqlOperationOptions<GetAtomsForSelectQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetAtomsForSelectGql,
        options: options ?? undefined,
      }),
    }),
    GetAtomsTypeHookForSelect: build.query<
      GetAtomsTypeHookForSelectQuery,
      | GraphqlOperationOptions<GetAtomsTypeHookForSelectQueryVariables>
      | void
      | undefined
    >({
      query: (options) => ({
        document: GetAtomsTypeHookForSelectGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useImportTypesMutation,
  useExportTypesQuery,
  useLazyExportTypesQuery,
  useCreateTypeMutation,
  useDeleteTypeMutation,
  useGetTypeQuery,
  useLazyGetTypeQuery,
  useGetTypeGraphQuery,
  useLazyGetTypeGraphQuery,
  useGetTypesQuery,
  useLazyGetTypesQuery,
  useUpdateEnumTypeMutation,
  useUpdateTypeMutation,
  useUpdatePrimitiveTypeMutation,
  useUpdateUnionTypeMutation,
  useGetTypeKindsQuery,
  useLazyGetTypeKindsQuery,
  useGetPagesForSelectQuery,
  useLazyGetPagesForSelectQuery,
  useGetLambdasForSelectQuery,
  useLazyGetLambdasForSelectQuery,
  useGetComponentsForSelectQuery,
  useLazyGetComponentsForSelectQuery,
  useGetAtomsForSelectQuery,
  useLazyGetAtomsForSelectQuery,
  useGetAtomsTypeHookForSelectQuery,
  useLazyGetAtomsTypeHookForSelectQuery,
} = injectedRtkApi
