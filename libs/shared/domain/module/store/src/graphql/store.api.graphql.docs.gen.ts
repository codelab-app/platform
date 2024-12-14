import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
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
