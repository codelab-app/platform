import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateStoresDocument, DeleteStoresDocument, GetStoresDocument, UpdateStoresDocument } from '@codelab/shared/infra/gqlgen'

export const CreateStores = (variables: Types.CreateStoresMutationVariables, next?: NextFetchOptions) => gqlServerRequest(CreateStoresDocument.toString(), variables, next)
export const DeleteStores = (variables: Types.DeleteStoresMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteStoresDocument.toString(), variables, next)
export const GetStores = (variables: Types.GetStoresQueryVariables, next?: NextFetchOptions) => gqlServerRequest(GetStoresDocument.toString(), variables, next)
export const UpdateStores = (variables: Types.UpdateStoresMutationVariables, next?: NextFetchOptions) => gqlServerRequest(UpdateStoresDocument.toString(), variables, next)
