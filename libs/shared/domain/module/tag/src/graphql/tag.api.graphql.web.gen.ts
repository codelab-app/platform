import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateTagsDocument, UpdateTagsDocument, DeleteTagsDocument, GetTagsDocument } from '@codelab/shared/infra/gqlgen'

export const CreateTags = (variables: Types.CreateTagsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateTagsDocument.toString(), variables, next)
export const UpdateTags = (variables: Types.UpdateTagsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateTagsDocument.toString(), variables, next)
export const DeleteTags = (variables: Types.DeleteTagsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteTagsDocument.toString(), variables, next)
export const GetTags = (variables: Types.GetTagsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetTagsDocument.toString(), variables, next)