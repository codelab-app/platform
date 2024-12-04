import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { HookFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateHooksMutationVariables,
  type DeleteHooksMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateHooksDocument,
  DeleteHooksDocument,
} from './hook.api.graphql.docs.gen'

export const getSdk = () => ({
  CreateHooks: (variables: CreateHooksMutationVariables) =>
    gqlRequest(CreateHooksDocument.toString(), variables),
  DeleteHooks: (variables: DeleteHooksMutationVariables) =>
    gqlRequest(DeleteHooksDocument.toString(), variables),
})
