import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import {
  type DeleteCodeActionsMutationVariables,
  type DeleteApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  DeleteCodeActionsDocument,
  DeleteApiActionsDocument,
} from './delete-action.api.documents.graphql.gen'

export const DeleteCodeActions = (
  variables: DeleteCodeActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteCodeActionsDocument.toString(), variables, next)

export const DeleteApiActions = (
  variables: DeleteApiActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteApiActionsDocument.toString(), variables, next)
