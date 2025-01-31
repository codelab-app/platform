import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateComponentsDocument, DeleteComponentsDocument, UpdateComponentsDocument, ComponentListDocument } from '@codelab/shared/infra/gqlgen'



export const CreateComponents = (variables: Types.CreateComponentsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateComponentsDocument.toString(), variables, next)
export const DeleteComponents = (variables: Types.DeleteComponentsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteComponentsDocument.toString(), variables, next)
export const UpdateComponents = (variables: Types.UpdateComponentsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateComponentsDocument.toString(), variables, next)
export const ComponentList = (variables: Types.ComponentListQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(ComponentListDocument.toString(), variables, next)