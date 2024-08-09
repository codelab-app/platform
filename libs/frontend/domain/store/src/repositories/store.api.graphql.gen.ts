import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { StoreFragmentDoc } from '@codelab/shared/infra/gql'

export const CreateStoresDocument = graphql(`
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
`)

export const DeleteStoresDocument = graphql(`
  mutation DeleteStores($where: StoreWhere, $delete: StoreDeleteInput) {
    deleteStores(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const GetStoresDocument = graphql(`
  query GetStores($where: StoreWhere, $options: StoreOptions) {
    aggregate: storesAggregate(where: $where) {
      count
    }
    items: stores(options: $options, where: $where) {
      ...Store
    }
  }
`)

export const UpdateStoresDocument = graphql(`
  mutation UpdateStores($where: StoreWhere, $update: StoreUpdateInput) {
    updateStores(update: $update, where: $where) {
      stores {
        id
      }
    }
  }
`)

import {
  type CreateStoresMutationVariables,
  type DeleteStoresMutationVariables,
  type GetStoresQueryVariables,
  type UpdateStoresMutationVariables,
} from '@codelab/frontend/infra/gql'

export const CreateStores = (
  variables: CreateStoresMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateStoresDocument.toString(), variables, next)

export const DeleteStores = (
  variables: DeleteStoresMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteStoresDocument.toString(), variables, next)

export const GetStores = (
  variables: GetStoresQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetStoresDocument.toString(), variables, next)

export const UpdateStores = (
  variables: UpdateStoresMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateStoresDocument.toString(), variables, next)
