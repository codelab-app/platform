import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './store.api.documents.graphql.gen'

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
