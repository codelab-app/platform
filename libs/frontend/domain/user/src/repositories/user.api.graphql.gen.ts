import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
import { UserFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type GetUsersQueryVariables,
  type CreateUserMutationVariables,
} from '@codelab/shared/infra/gql'
import {
  GetUsersDocument,
  CreateUserDocument,
} from './user.api.documents.graphql.gen'

export const GetUsers = (
  variables: GetUsersQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetUsersDocument.toString(), variables, next)

export const CreateUser = (
  variables: CreateUserMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateUserDocument.toString(), variables, next)
