import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlServerRequest } from '@codelab/shared/infra/fetch-server'
import { RedirectFragmentDoc } from '@codelab/shared/infra/gql'

import {
  type CreateRedirectsMutationVariables,
  type DeleteRedirectsMutationVariables,
  type UpdateRedirectsMutationVariables,
  type GetRedirectsQueryVariables,
} from '@codelab/shared/infra/gql'
import {
  CreateRedirectsDocument,
  DeleteRedirectsDocument,
  UpdateRedirectsDocument,
  GetRedirectsDocument,
} from './redirect.api.graphql.docs.gen'

export const CreateRedirects = (
  variables: CreateRedirectsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(CreateRedirectsDocument.toString(), variables, next)

export const DeleteRedirects = (
  variables: DeleteRedirectsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(DeleteRedirectsDocument.toString(), variables, next)

export const UpdateRedirects = (
  variables: UpdateRedirectsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(UpdateRedirectsDocument.toString(), variables, next)

export const GetRedirects = (
  variables: GetRedirectsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlServerRequest(GetRedirectsDocument.toString(), variables, next)
