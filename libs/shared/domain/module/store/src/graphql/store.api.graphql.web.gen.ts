import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateStoresDocument, DeleteStoresDocument, GetStoresDocument, UpdateStoresDocument } from '@codelab/shared/infra/gqlgen'



export const CreateStores = (variables: Types.CreateStoresMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateStoresDocument.toString(), variables, next)
export const DeleteStores = (variables: Types.DeleteStoresMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteStoresDocument.toString(), variables, next)
export const GetStores = (variables: Types.GetStoresQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetStoresDocument.toString(), variables, next)
export const UpdateStores = (variables: Types.UpdateStoresMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateStoresDocument.toString(), variables, next)