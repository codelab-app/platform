import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateFieldsDocument, UpdateFieldsDocument, DeleteFieldsDocument, GetFieldsDocument } from '@codelab/shared/infra/gqlgen'

export const CreateFields = (variables: Types.CreateFieldsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateFieldsDocument.toString(), variables, next)
export const UpdateFields = (variables: Types.UpdateFieldsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateFieldsDocument.toString(), variables, next)
export const DeleteFields = (variables: Types.DeleteFieldsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteFieldsDocument.toString(), variables, next)
export const GetFields = (variables: Types.GetFieldsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetFieldsDocument.toString(), variables, next)