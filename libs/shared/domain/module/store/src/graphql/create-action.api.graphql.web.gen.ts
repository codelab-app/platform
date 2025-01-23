import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'

import {
  type CreateCodeActionsMutationVariables,
  type CreateApiActionsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateCodeActionsDocument,
  CreateApiActionsDocument,
} from './create-action.api.graphql.docs.gen'

export const CreateCodeActions = (
  variables: CreateCodeActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateCodeActionsDocument.toString(), variables, next)

export const CreateApiActions = (
  variables: CreateApiActionsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateApiActionsDocument.toString(), variables, next)
