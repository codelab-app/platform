import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { CreateCodeActionsDocument, CreateApiActionsDocument } from '@codelab/shared/infra/gqlgen'

export const CreateCodeActions = (variables: Types.CreateCodeActionsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(CreateCodeActionsDocument.toString(), variables, next)
export const CreateApiActions = (variables: Types.CreateApiActionsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(CreateApiActionsDocument.toString(), variables, next)
