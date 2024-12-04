import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { StoreFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateStoresMutationVariables,
  type DeleteStoresMutationVariables,
  type GetStoresQueryVariables,
  type UpdateStoresMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateStoresDocument,
  DeleteStoresDocument,
  GetStoresDocument,
  UpdateStoresDocument,
} from './store.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateStores: (variables: CreateStoresMutationVariables) =>
    gqlRequest(CreateStoresDocument.toString(), variables),
  DeleteStores: (variables: DeleteStoresMutationVariables) =>
    gqlRequest(DeleteStoresDocument.toString(), variables),
  GetStores: (variables: GetStoresQueryVariables) =>
    gqlRequest(GetStoresDocument.toString(), variables),
  UpdateStores: (variables: UpdateStoresMutationVariables) =>
    gqlRequest(UpdateStoresDocument.toString(), variables),
})
