import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlRequest } from '@codelab/shared/infra/fetch'
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

export const getSdk = () => ({
  CreateRedirects: (variables: CreateRedirectsMutationVariables) =>
    gqlRequest(CreateRedirectsDocument.toString(), variables),
  DeleteRedirects: (variables: DeleteRedirectsMutationVariables) =>
    gqlRequest(DeleteRedirectsDocument.toString(), variables),
  UpdateRedirects: (variables: UpdateRedirectsMutationVariables) =>
    gqlRequest(UpdateRedirectsDocument.toString(), variables),
  GetRedirects: (variables: GetRedirectsQueryVariables) =>
    gqlRequest(GetRedirectsDocument.toString(), variables),
})
