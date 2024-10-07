import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'

import {
  type CreateCodeActionsMutationVariables,
  type CreateApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateCodeActionsDocument,
  CreateApiActionsDocument,
} from './create-action.api.documents.graphql.gen'

export const CreateCodeActions = (
  variables: CreateCodeActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateCodeActionsDocument.toString(), variables, next)

export const CreateApiActions = (
  variables: CreateApiActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateApiActionsDocument.toString(), variables, next)
