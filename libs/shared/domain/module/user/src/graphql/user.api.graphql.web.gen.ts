import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { UserFragmentDoc } from '@codelab/shared/infra/gqlgen'

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
  type DeleteUsersMutationVariables,
  type UpdateUsersMutationVariables,
} from '@codelab/shared/infra/gqlgen'
import {
  GetUsersDocument,
  CreateUserDocument,
  DeleteUsersDocument,
  UpdateUsersDocument,
} from './user.api.graphql.docs.gen'

export const GetUsers = (
  variables: GetUsersQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetUsersDocument.toString(), variables, next)

export const CreateUser = (
  variables: CreateUserMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateUserDocument.toString(), variables, next)

export const DeleteUsers = (
  variables: DeleteUsersMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteUsersDocument.toString(), variables, next)

export const UpdateUsers = (
  variables: UpdateUsersMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateUsersDocument.toString(), variables, next)
