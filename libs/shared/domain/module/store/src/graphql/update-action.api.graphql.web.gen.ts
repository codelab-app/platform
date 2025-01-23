import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

import {
  type UpdateCodeActionsMutationVariables,
  type UpdateApiActionsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  UpdateCodeActionsDocument,
  UpdateApiActionsDocument,
} from './update-action.api.graphql.docs.gen'

export const UpdateCodeActions = (
  variables: UpdateCodeActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateCodeActionsDocument.toString(), variables, next)

export const UpdateApiActions = (
  variables: UpdateApiActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateApiActionsDocument.toString(), variables, next)
