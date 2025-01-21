import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { StoreFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateStoresMutationVariables,
  type DeleteStoresMutationVariables,
  type GetStoresQueryVariables,
  type UpdateStoresMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateStoresDocument,
  DeleteStoresDocument,
  GetStoresDocument,
  UpdateStoresDocument,
} from './store.api.graphql.docs.gen'

export const CreateStores = (
  variables: CreateStoresMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateStoresDocument.toString(), variables, next)

export const DeleteStores = (
  variables: DeleteStoresMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteStoresDocument.toString(), variables, next)

export const GetStores = (
  variables: GetStoresQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetStoresDocument.toString(), variables, next)

export const UpdateStores = (
  variables: UpdateStoresMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateStoresDocument.toString(), variables, next)
