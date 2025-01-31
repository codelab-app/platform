import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateElementsDocument, DeleteElementsDocument, UpdateElementsDocument, ElementListDocument } from '@codelab/shared/infra/gqlgen'

export const CreateElements = (variables: Types.CreateElementsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateElementsDocument.toString(), variables, next)
export const DeleteElements = (variables: Types.DeleteElementsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteElementsDocument.toString(), variables, next)
export const UpdateElements = (variables: Types.UpdateElementsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateElementsDocument.toString(), variables, next)
export const ElementList = (variables: Types.ElementListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(ElementListDocument.toString(), variables, next)