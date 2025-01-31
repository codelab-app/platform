import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DeleteCodeActionsDocument, DeleteApiActionsDocument } from '@codelab/shared/infra/gqlgen'



export const DeleteCodeActions = (variables: Types.DeleteCodeActionsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteCodeActionsDocument.toString(), variables, next)
export const DeleteApiActions = (variables: Types.DeleteApiActionsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(DeleteApiActionsDocument.toString(), variables, next)