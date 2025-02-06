import * as Types from '@codelab/shared/infra/gqlgen';

import type { NextFetchOptions } from '@codelab/shared/abstract/types'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { UpdateCodeActionsDocument, UpdateApiActionsDocument } from '@codelab/shared/infra/gqlgen'

export const UpdateCodeActions = (variables: Types.UpdateCodeActionsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateCodeActionsDocument.toString(), variables, next)
export const UpdateApiActions = (variables: Types.UpdateApiActionsMutationVariables ,next?: NextFetchOptions) => gqlServerRequest(UpdateApiActionsDocument.toString(), variables, next)
