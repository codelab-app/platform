import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { GetAuthGuardsDocument, CreateAuthGuardsDocument, UpdateAuthGuardDocument, DeleteAuthGuardsDocument } from '@codelab/shared/infra/gqlgen'

export const GetAuthGuards = (variables: Types.GetAuthGuardsQueryVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(GetAuthGuardsDocument.toString(), variables, next)
export const CreateAuthGuards = (variables: Types.CreateAuthGuardsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateAuthGuardsDocument.toString(), variables, next)
export const UpdateAuthGuard = (variables: Types.UpdateAuthGuardMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateAuthGuardDocument.toString(), variables, next)
export const DeleteAuthGuards = (variables: Types.DeleteAuthGuardsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteAuthGuardsDocument.toString(), variables, next)
