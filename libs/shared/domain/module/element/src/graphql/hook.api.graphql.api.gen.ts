import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { HookFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type CreateHooksMutationVariables,
  type DeleteHooksMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  CreateHooksDocument,
  DeleteHooksDocument,
} from './hook.api.graphql.docs.gen'
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateHooks: (variables: CreateHooksMutationVariables) =>
    gqlRequest(client, CreateHooksDocument.toString(), variables),
  DeleteHooks: (variables: DeleteHooksMutationVariables) =>
    gqlRequest(client, DeleteHooksDocument.toString(), variables),
})
