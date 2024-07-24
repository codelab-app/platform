import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { StoreFragmentDoc } from '@codelab/frontend/infra/gql'

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

const CreateStores = (
  variables: CreateStoresMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateStoresDocument, variables, next)

const DeleteStores = (
  variables: DeleteStoresMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteStoresDocument, variables, next)

const GetStores = (
  variables: GetStoresQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetStoresDocument, variables, next)

const UpdateStores = (
  variables: UpdateStoresMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateStoresDocument, variables, next)

export const getSdk = () => ({
  CreateStores,
  DeleteStores,
  GetStores,
  UpdateStores,
})
