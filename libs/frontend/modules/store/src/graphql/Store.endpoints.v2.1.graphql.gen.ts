import * as Types from '@codelab/shared/abstract/codegen-v2'

import {
  StoreFragment,
  StoreGraphFragment,
  StoreEdgeFragment,
} from './Store.fragment.v2.1.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
import {
  StoreFragmentDoc,
  StoreGraphFragmentDoc,
  StoreEdgeFragmentDoc,
} from './Store.fragment.v2.1.graphql.gen'
export type CreateStoresMutationVariables = Types.Exact<{
  input: Array<Types.StoreCreateInput> | Types.StoreCreateInput
}>

export type CreateStoresMutation = {
  createStores: {
    info: { nodesCreated: number; relationshipsCreated: number }
    stores: Array<StoreFragment>
  }
}

export type DeleteStoresMutationVariables = Types.Exact<{
  where: Types.StoreWhere
}>

export type DeleteStoresMutation = {
  deleteStores: { nodesDeleted: number; relationshipsDeleted: number }
}

export type GetStoresQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  options?: Types.InputMaybe<Types.StoreOptions>
}>

export type GetStoresQuery = { stores: Array<StoreFragment> }

export type GetStoresGraphsQueryVariables = Types.Exact<{
  [key: string]: never
}>

export type GetStoresGraphsQuery = { storesGraphs: StoreGraphFragment }

export type UpdateStoresMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  update?: Types.InputMaybe<Types.StoreUpdateInput>
}>

export type UpdateStoresMutation = {
  updateStores: { stores: Array<StoreFragment> }
}

export const CreateStoresGql = gql`
  mutation CreateStores($input: [StoreCreateInput!]!) {
    createStores(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      stores {
        ...Store
      }
    }
  }
  ${StoreFragmentDoc}
`
export const DeleteStoresGql = gql`
  mutation DeleteStores($where: StoreWhere!) {
    deleteStores(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const GetStoresGql = gql`
  query GetStores($where: StoreWhere, $options: StoreOptions) {
    stores(where: $where, options: $options) {
      ...Store
    }
  }
  ${StoreFragmentDoc}
`
export const GetStoresGraphsGql = gql`
  query GetStoresGraphs {
    storesGraphs {
      ...StoreGraph
    }
  }
  ${StoreGraphFragmentDoc}
  ${StoreEdgeFragmentDoc}
  ${StoreFragmentDoc}
`
export const UpdateStoresGql = gql`
  mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
    updateStores(update: $update, where: $where) {
      stores {
        ...Store
      }
    }
  }
  ${StoreFragmentDoc}
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
          client.request<CreateStoresMutation>(CreateStoresGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateStores',
        'mutation',
      )
    },
    DeleteStores(
      variables: DeleteStoresMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteStoresMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteStoresMutation>(DeleteStoresGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
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
          client.request<GetStoresQuery>(GetStoresGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetStores',
        'query',
      )
    },
    GetStoresGraphs(
      variables?: GetStoresGraphsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetStoresGraphsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetStoresGraphsQuery>(GetStoresGraphsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetStoresGraphs',
        'query',
      )
    },
    UpdateStores(
      variables?: UpdateStoresMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateStoresMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateStoresMutation>(UpdateStoresGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateStores',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
