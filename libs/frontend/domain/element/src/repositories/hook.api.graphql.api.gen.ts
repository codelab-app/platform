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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateHooks: (variables: CreateHooksMutationVariables) =>
    gqlRequest(client, CreateHooksDocument.toString(), variables),
  DeleteHooks: (variables: DeleteHooksMutationVariables) =>
    gqlRequest(client, DeleteHooksDocument.toString(), variables),
})
