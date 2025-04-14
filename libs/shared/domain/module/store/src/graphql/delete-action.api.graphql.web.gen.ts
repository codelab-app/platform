import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { DeleteCodeActionsDocument, DeleteApiActionsDocument } from '@codelab/shared/infra/gqlgen'

export const DeleteCodeActions = (variables: Types.DeleteCodeActionsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteCodeActionsDocument.toString(), variables, next)
export const DeleteApiActions = (variables: Types.DeleteApiActionsMutationVariables, next?: NextFetchOptions) => gqlServerRequest(DeleteApiActionsDocument.toString(), variables, next)
