import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import {
  type UpdateCodeActionsMutationVariables,
  type UpdateApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  UpdateCodeActionsDocument,
  UpdateApiActionsDocument,
} from './update-action.api.documents.graphql.gen'

export const UpdateCodeActions = (
  variables: UpdateCodeActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateCodeActionsDocument.toString(), variables, next)

export const UpdateApiActions = (
  variables: UpdateApiActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateApiActionsDocument.toString(), variables, next)
