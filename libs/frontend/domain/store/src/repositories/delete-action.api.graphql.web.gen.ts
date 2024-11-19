import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch/use-server'

import {
  type DeleteCodeActionsMutationVariables,
  type DeleteApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
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
