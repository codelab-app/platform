import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { HookFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateHooksMutationVariables,
  type DeleteHooksMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateHooksDocument,
  DeleteHooksDocument,
} from './hook.api.documents.graphql.gen'

export const CreateHooks = (
  variables: CreateHooksMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateHooksDocument.toString(), variables, next)

export const DeleteHooks = (
  variables: DeleteHooksMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteHooksDocument.toString(), variables, next)
