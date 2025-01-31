import * as Types from '@codelab/shared/infra/gqlgen';

import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateCodeActionsDocument, CreateApiActionsDocument } from '@codelab/shared/infra/gqlgen'

export const CreateCodeActions = (variables: Types.CreateCodeActionsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateCodeActionsDocument.toString(), variables, next)
export const CreateApiActions = (variables: Types.CreateApiActionsMutationVariables ,next?: NextFetchRequestConfig & { revalidateTag?: string }) => gqlServerRequest(CreateApiActionsDocument.toString(), variables, next)