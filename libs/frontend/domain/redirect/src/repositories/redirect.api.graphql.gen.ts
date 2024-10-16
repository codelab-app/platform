import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/shared/infra/fetch'
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
} from './redirect.api.documents.graphql.gen'

export const CreateRedirects = (
  variables: CreateRedirectsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(CreateRedirectsDocument.toString(), variables, next)

export const DeleteRedirects = (
  variables: DeleteRedirectsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(DeleteRedirectsDocument.toString(), variables, next)

export const UpdateRedirects = (
  variables: UpdateRedirectsMutationVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(UpdateRedirectsDocument.toString(), variables, next)

export const GetRedirects = (
  variables: GetRedirectsQueryVariables,
  next?: NextFetchRequestConfig & { revalidateTag?: string },
) => gqlFetch(GetRedirectsDocument.toString(), variables, next)
