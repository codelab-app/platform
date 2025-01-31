import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateRedirectsDocument, DeleteRedirectsDocument, UpdateRedirectsDocument, GetRedirectsDocument, GetRedirectsPreviewDocument } from '@codelab/shared/infra/gqlgen'

export const CreateRedirects = (variables: Types.CreateRedirectsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateRedirectsDocument.toString(), variables, next)
export const DeleteRedirects = (variables: Types.DeleteRedirectsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteRedirectsDocument.toString(), variables, next)
export const UpdateRedirects = (variables: Types.UpdateRedirectsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateRedirectsDocument.toString(), variables, next)
export const GetRedirects = (variables: Types.GetRedirectsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetRedirectsDocument.toString(), variables, next)
export const GetRedirectsPreview = (variables: Types.GetRedirectsPreviewQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetRedirectsPreviewDocument.toString(), variables, next)