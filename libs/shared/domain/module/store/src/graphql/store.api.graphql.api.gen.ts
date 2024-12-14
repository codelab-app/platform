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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateStores: (variables: CreateStoresMutationVariables) =>
    gqlRequest(client, CreateStoresDocument.toString(), variables),
  DeleteStores: (variables: DeleteStoresMutationVariables) =>
    gqlRequest(client, DeleteStoresDocument.toString(), variables),
  GetStores: (variables: GetStoresQueryVariables) =>
    gqlRequest(client, GetStoresDocument.toString(), variables),
  UpdateStores: (variables: UpdateStoresMutationVariables) =>
    gqlRequest(client, UpdateStoresDocument.toString(), variables),
})
