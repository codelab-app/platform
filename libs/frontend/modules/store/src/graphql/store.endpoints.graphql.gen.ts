import * as Types from '@codelab/shared/abstract/codegen'

import { StoreFragment } from '../../../../../shared/abstract/core/src/domain/store/store.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { StoreFragmentDoc } from '../../../../../shared/abstract/core/src/domain/store/store.fragment.graphql.gen'
export type CreateStoresMutationVariables = Types.Exact<{
  input: Array<Types.StoreCreateInput> | Types.StoreCreateInput
}>

export type CreateStoresMutation = {
  createStores: {
    info: { nodesCreated: number; relationshipsCreated: number }
    stores: Array<StoreFragment>
  }
}

export type DeleteStoresSubgraphMutationVariables = Types.Exact<{
  where: Types.StoreWhere
}>

export type DeleteStoresSubgraphMutation = {
  deleteStoresSubgraph: { nodesDeleted: number; relationshipsDeleted: number }
}

export type GetStoresQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  options?: Types.InputMaybe<Types.StoreOptions>
}>

export type GetStoresQuery = {
  stores: Array<{ descendants: Array<StoreFragment> } & StoreFragment>
}

export type UpdateStoresMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StoreWhere>
  update?: Types.InputMaybe<Types.StoreUpdateInput>
}>

export type UpdateStoresMutation = {
  updateStores: { stores: Array<StoreFragment> }
}

export const CreateStoresDocument = gql`
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
export const DeleteStoresSubgraphDocument = gql`
  mutation DeleteStoresSubgraph($where: StoreWhere!) {
    deleteStoresSubgraph(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const GetStoresDocument = gql`
  query GetStores($where: StoreWhere, $options: StoreOptions) {
    stores(where: $where, options: $options) {
      ...Store
      descendants {
        ...Store
      }
    }
  }
  ${StoreFragmentDoc}
`
export const UpdateStoresDocument = gql`
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
          client.request<CreateStoresMutation>(
            CreateStoresDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'CreateStores',
        'mutation',
      )
    },
    DeleteStoresSubgraph(
      variables: DeleteStoresSubgraphMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteStoresSubgraphMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteStoresSubgraphMutation>(
            DeleteStoresSubgraphDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteStoresSubgraph',
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
