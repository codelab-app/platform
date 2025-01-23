import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

import {
  type DeleteCodeActionsMutationVariables,
  type DeleteApiActionsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  DeleteCodeActionsDocument,
  DeleteApiActionsDocument,
} from './delete-action.api.graphql.docs.gen'

export const DeleteCodeActions = (
  variables: DeleteCodeActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteCodeActionsDocument.toString(), variables, next)

export const DeleteApiActions = (
  variables: DeleteApiActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteApiActionsDocument.toString(), variables, next)
