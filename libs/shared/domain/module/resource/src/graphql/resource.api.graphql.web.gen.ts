import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { ResourceListDocument, CreateResourcesDocument, UpdateResourcesDocument, DeleteResourcesDocument } from '@codelab/shared/infra/gqlgen'



export const ResourceList = (variables: Types.ResourceListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(ResourceListDocument.toString(), variables, next)
export const CreateResources = (variables: Types.CreateResourcesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateResourcesDocument.toString(), variables, next)
export const UpdateResources = (variables: Types.UpdateResourcesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateResourcesDocument.toString(), variables, next)
export const DeleteResources = (variables: Types.DeleteResourcesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteResourcesDocument.toString(), variables, next)