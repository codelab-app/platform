import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { UpdateCodeActionsDocument, UpdateApiActionsDocument } from '@codelab/shared/infra/gqlgen'

export const UpdateCodeActions = (variables: Types.UpdateCodeActionsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateCodeActionsDocument.toString(), variables, next)
export const UpdateApiActions = (variables: Types.UpdateApiActionsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(UpdateApiActionsDocument.toString(), variables, next)
