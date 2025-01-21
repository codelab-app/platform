import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { HookFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateHooksMutationVariables,
  type DeleteHooksMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateHooksDocument,
  DeleteHooksDocument,
} from './hook.api.graphql.docs.gen'

export const CreateHooks = (
  variables: CreateHooksMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateHooksDocument.toString(), variables, next)

export const DeleteHooks = (
  variables: DeleteHooksMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteHooksDocument.toString(), variables, next)
