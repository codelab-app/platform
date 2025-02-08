import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateRedirectsDocument, DeleteRedirectsDocument, UpdateRedirectsDocument, GetRedirectsDocument, GetRedirectsPreviewDocument } from '@codelab/shared/infra/gqlgen'

export const CreateRedirects = (variables: Types.CreateRedirectsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(CreateRedirectsDocument.toString(), variables, next)
export const DeleteRedirects = (variables: Types.DeleteRedirectsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(DeleteRedirectsDocument.toString(), variables, next)
export const UpdateRedirects = (variables: Types.UpdateRedirectsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateRedirectsDocument.toString(), variables, next)
export const GetRedirects = (variables: Types.GetRedirectsQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(GetRedirectsDocument.toString(), variables, next)
export const GetRedirectsPreview = (variables: Types.GetRedirectsPreviewQueryVariables ,next?: NextFetchOptions) => gqlServerRequest(GetRedirectsPreviewDocument.toString(), variables, next)
