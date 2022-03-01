import * as Types from '@codelab/shared/abstract/codegen-v2'

import { InterfaceTypeEdgeFragment } from './fragments/Field.fragment.v2.graphql.gen'
import { gql } from 'graphql-request'
import { InterfaceTypeEdgeFragmentDoc } from './fragments/Field.fragment.v2.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type CreateFieldMutationVariables = Types.Exact<{
  input: Types.UpsertFieldInput
}>

export type CreateFieldMutation = { upsertFieldEdge: InterfaceTypeEdgeFragment }

export type UpdateFieldMutationVariables = Types.Exact<{
  input: Types.UpsertFieldInput
}>

export type UpdateFieldMutation = { upsertFieldEdge: InterfaceTypeEdgeFragment }

export type DeleteFieldMutationVariables = Types.Exact<{
  input: Types.DeleteFieldInput
}>

export type DeleteFieldMutation = {
  deleteFieldEdge: { deletedEdgesCount: number }
}

export type IsTypeDescendantOfQueryVariables = Types.Exact<{
  descendantTypeId: Types.Scalars['ID']
  parentTypeId: Types.Scalars['ID']
}>

export type IsTypeDescendantOfQuery = {
  isTypeDescendantOf?: boolean | null | undefined
}

export type GetTypeReferencesQueryVariables = Types.Exact<{
  typeId: Types.Scalars['ID']
}>

export type GetTypeReferencesQuery = {
  getTypeReferences?: Array<{ name: string; label: string }> | null | undefined
}

export const CreateFieldGql = gql`
  mutation CreateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: true) {
      ...InterfaceTypeEdge
    }
  }
  ${InterfaceTypeEdgeFragmentDoc}
`
export const UpdateFieldGql = gql`
  mutation UpdateField($input: UpsertFieldInput!) {
    upsertFieldEdge(input: $input, isCreating: false) {
      ...InterfaceTypeEdge
    }
  }
  ${InterfaceTypeEdgeFragmentDoc}
`
export const DeleteFieldGql = gql`
  mutation DeleteField($input: DeleteFieldInput!) {
    deleteFieldEdge(input: $input) {
      deletedEdgesCount
    }
  }
`
export const IsTypeDescendantOfGql = gql`
  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
    isTypeDescendantOf(
      descendantTypeId: $descendantTypeId
      parentTypeId: $parentTypeId
    )
  }
`
export const GetTypeReferencesGql = gql`
  query GetTypeReferences($typeId: ID!) {
    getTypeReferences(typeId: $typeId) {
      name
      label
    }
  }
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateField: build.mutation<
      CreateFieldMutation,
      GraphqlOperationOptions<CreateFieldMutationVariables>
    >({
      query: (options) => ({
        document: CreateFieldGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    UpdateField: build.mutation<
      UpdateFieldMutation,
      GraphqlOperationOptions<UpdateFieldMutationVariables>
    >({
      query: (options) => ({
        document: UpdateFieldGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    DeleteField: build.mutation<
      DeleteFieldMutation,
      GraphqlOperationOptions<DeleteFieldMutationVariables>
    >({
      query: (options) => ({
        document: DeleteFieldGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    IsTypeDescendantOf: build.query<
      IsTypeDescendantOfQuery,
      GraphqlOperationOptions<IsTypeDescendantOfQueryVariables>
    >({
      query: (options) => ({
        document: IsTypeDescendantOfGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
    GetTypeReferences: build.query<
      GetTypeReferencesQuery,
      GraphqlOperationOptions<GetTypeReferencesQueryVariables>
    >({
      query: (options) => ({
        document: GetTypeReferencesGql,
        options: { ...{ context: { env: 'v2' } }, ...options },
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useCreateFieldMutation,
  useUpdateFieldMutation,
  useDeleteFieldMutation,
  useIsTypeDescendantOfQuery,
  useLazyIsTypeDescendantOfQuery,
  useGetTypeReferencesQuery,
  useLazyGetTypeReferencesQuery,
} = injectedRtkApi
