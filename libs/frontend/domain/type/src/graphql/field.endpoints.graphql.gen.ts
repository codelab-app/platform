import * as Types from '@codelab/shared/abstract/codegen'





import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import {
  InterfaceTypeFragment,
  InterfaceTypeFragmentDoc,
} from '../../../../abstract/core/src/domain/type/fragments/interface.fragment.graphql.gen'

export type UpsertFieldMutationVariables = Types.Exact<{
  interfaceTypeId: Types.Scalars['ID']
  fieldTypeId: Types.Scalars['ID']
  field: Types.FieldCreateInput
}>

export interface UpsertFieldMutation {
  upsertField: InterfaceTypeFragment
}

export type DeleteFieldMutationVariables = Types.Exact<{
  interfaceId: Types.Scalars['ID']
  where: Types.FieldWhere
}>

export interface DeleteFieldMutation {
  updateInterfaceTypes: { interfaceTypes: Array<InterfaceTypeFragment> }
}

export const UpsertFieldDocument = gql`
  mutation UpsertField(
    $interfaceTypeId: ID!
    $fieldTypeId: ID!
    $field: FieldCreateInput!
  ) {
    upsertField(
      interfaceTypeId: $interfaceTypeId
      fieldTypeId: $fieldTypeId
      field: $field
    ) {
      ...InterfaceType
    }
  }
  ${InterfaceTypeFragmentDoc}
`
export const DeleteFieldDocument = gql`
  mutation DeleteField($interfaceId: ID!, $where: FieldWhere!) {
    updateInterfaceTypes(
      where: { id: $interfaceId }
      disconnect: { fields: [{ where: { edge: $where } }] }
    ) {
      interfaceTypes {
        ...InterfaceType
      }
    }
  }
  ${InterfaceTypeFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    UpsertField(
      variables: UpsertFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpsertFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpsertFieldMutation>(UpsertFieldDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpsertField',
        'mutation',
      )
    },
    DeleteField(
      variables: DeleteFieldMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteFieldMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteFieldMutation>(DeleteFieldDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteField',
        'mutation',
      )
    },
  }
}

export type Sdk = ReturnType<typeof getSdk>
