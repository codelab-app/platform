import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreatePagesDocument, DeletePagesDocument, UpdatePagesDocument, PageListDocument, GetRenderedPageDocument } from '@codelab/shared/infra/gqlgen'



export const CreatePages = (variables: Types.CreatePagesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreatePagesDocument.toString(), variables, next)
export const DeletePages = (variables: Types.DeletePagesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeletePagesDocument.toString(), variables, next)
export const UpdatePages = (variables: Types.UpdatePagesMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdatePagesDocument.toString(), variables, next)
export const PageList = (variables: Types.PageListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(PageListDocument.toString(), variables, next)
export const GetRenderedPage = (variables: Types.GetRenderedPageQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetRenderedPageDocument.toString(), variables, next)