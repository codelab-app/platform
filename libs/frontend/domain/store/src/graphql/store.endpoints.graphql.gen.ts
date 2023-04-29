import * as Types from '@codelab/shared/abstract/codegen'

import { StoreFragment } from '../../../../abstract/core/src/domain/store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { StoreFragmentDoc } from '../../../../abstract/core/src/domain/store/store.fragment.graphql.gen'
export type CreateStoresMutationVariables = Types.Exact<{
  input: Array<Types.StoreCreateInput> | Types.StoreCreateInput
}>

export type CreateStoresMutation = {
  createStores: {
    info: { nodesCreated: number; relationshipsCreated: number }
    stores: Array<{ id: string }>
  }
}

export type DeleteStoresMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  delete?: Types.InputMaybe<Types.StoreDeleteInput>
}>

export type DeleteStoresMutation = { deleteStores: { nodesDeleted: number } }

export type GetStoresQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  options?: Types.InputMaybe<Types.StoreOptions>
}>

export type GetStoresQuery = {
  aggregate: { count: number }
  items: Array<StoreFragment>
}

export type UpdateStoresMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  update?: Types.InputMaybe<Types.StoreUpdateInput>
}>

export type UpdateStoresMutation = {
  updateStores: { stores: Array<{ id: string }> }
}

export const CreateStoresDocument = gql`
  mutation CreateStores($input: [StoreCreateInput!]!) {
    createStores(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      stores {
        id
      }
    }
  }
`
export const DeleteStoresDocument = gql`
  mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
    deleteStores(where: $where, delete: $delete) {
      nodesDeleted
    }
  }
`
export const GetStoresDocument = gql`
  query GetStores($where: StoreWhere, $options: StoreOptions) {
    aggregate: storesAggregate(where: $where) {
      count
    }
    items: stores(where: $where, options: $options) {
      ...Store
    }
  }
  ${StoreFragmentDoc}
`
export const UpdateStoresDocument = gql`
  mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
    updateStores(update: $update, where: $where) {
      stores {
        id
      }
    }
  }
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
    CreateStores(
      variables: CreateStoresMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateStoresMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateStoresMutation>(
            CreateStoresDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateStores',
        'mutation',
      )
    },
    DeleteStores(
      variables?: DeleteStoresMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteStoresMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteStoresMutation>(
            DeleteStoresDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteStores',
        'mutation',
      )
    },
    GetStores(
      variables?: GetStoresQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetStoresQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetStoresQuery>(GetStoresDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetStores',
        'query',
      )
    },
    UpdateStores(
      variables?: UpdateStoresMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateStoresMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateStoresMutation>(
            UpdateStoresDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'UpdateStores',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
