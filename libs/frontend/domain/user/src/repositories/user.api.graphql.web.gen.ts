import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch/use-server'
import { UserFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  GetUsersDocument,
  CreateUserDocument,
} from './user.api.graphql.docs.gen'

export const GetUsers = (
  variables: GetUsersQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetUsersDocument.toString(), variables, next)

export const CreateUser = (
  variables: CreateUserMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateUserDocument.toString(), variables, next)
