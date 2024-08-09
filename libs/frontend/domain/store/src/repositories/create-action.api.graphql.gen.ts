import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const CreateCodeActionsDocument = graphql(`
  mutation CreateCodeActions($input: [CodeActionCreateInput!]!) {
    createCodeActions(input: $input) {
      codeActions {
        id
      }
    }
  }
`)

export const CreateApiActionsDocument = graphql(`
  mutation CreateApiActions($input: [ApiActionCreateInput!]!) {
    createApiActions(input: $input) {
      apiActions {
        id
      }
    }
  }
`)

import {
  type CreateCodeActionsMutationVariables,
  type CreateApiActionsMutationVariables,
} from '@codelab/shared/infra/gql'

export const CreateCodeActions = (
  variables: CreateCodeActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateCodeActionsDocument.toString(), variables, next)

export const CreateApiActions = (
  variables: CreateApiActionsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateApiActionsDocument.toString(), variables, next)
