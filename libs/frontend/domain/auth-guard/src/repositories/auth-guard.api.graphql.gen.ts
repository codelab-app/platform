import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './auth-guard.api.documents.graphql.gen'

export const GetAuthGuards = (
  variables: GetAuthGuardsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetAuthGuardsDocument.toString(), variables, next)

export const CreateAuthGuards = (
  variables: CreateAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateAuthGuardsDocument.toString(), variables, next)

export const UpdateAuthGuard = (
  variables: UpdateAuthGuardMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateAuthGuardDocument.toString(), variables, next)

export const DeleteAuthGuards = (
  variables: DeleteAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAuthGuardsDocument.toString(), variables, next)
