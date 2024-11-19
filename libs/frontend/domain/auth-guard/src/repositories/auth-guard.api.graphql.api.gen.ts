import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
import { AuthGuardFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type GetAuthGuardsQueryVariables,
  type CreateAuthGuardsMutationVariables,
  type UpdateAuthGuardMutationVariables,
  type DeleteAuthGuardsMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  GetAuthGuardsDocument,
  CreateAuthGuardsDocument,
  UpdateAuthGuardDocument,
  DeleteAuthGuardsDocument,
} from './auth-guard.api.graphql.docs.gen'

export const getSdk = () => ({
  GetAuthGuards: (variables: GetAuthGuardsQueryVariables) =>
    gqlRequest(GetAuthGuardsDocument.toString(), variables),
  CreateAuthGuards: (variables: CreateAuthGuardsMutationVariables) =>
    gqlRequest(CreateAuthGuardsDocument.toString(), variables),
  UpdateAuthGuard: (variables: UpdateAuthGuardMutationVariables) =>
    gqlRequest(UpdateAuthGuardDocument.toString(), variables),
  DeleteAuthGuards: (variables: DeleteAuthGuardsMutationVariables) =>
    gqlRequest(DeleteAuthGuardsDocument.toString(), variables),
})
