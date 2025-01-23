import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { AuthGuardFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type GetAuthGuardsQueryVariables,
  type CreateAuthGuardsMutationVariables,
  type UpdateAuthGuardMutationVariables,
  type DeleteAuthGuardsMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  GetAuthGuardsDocument,
  CreateAuthGuardsDocument,
  UpdateAuthGuardDocument,
  DeleteAuthGuardsDocument,
} from './auth-guard.api.graphql.docs.gen'

export const GetAuthGuards = (
  variables: GetAuthGuardsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetAuthGuardsDocument.toString(), variables, next)

export const CreateAuthGuards = (
  variables: CreateAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateAuthGuardsDocument.toString(), variables, next)

export const UpdateAuthGuard = (
  variables: UpdateAuthGuardMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateAuthGuardDocument.toString(), variables, next)

export const DeleteAuthGuards = (
  variables: DeleteAuthGuardsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteAuthGuardsDocument.toString(), variables, next)
