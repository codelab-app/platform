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
import { GraphQLClient } from 'graphql-request'

export const getSdk = (client: GraphQLClient) => ({
  CreateRedirects: (variables: CreateRedirectsMutationVariables) =>
    gqlRequest(client, CreateRedirectsDocument.toString(), variables),
  DeleteRedirects: (variables: DeleteRedirectsMutationVariables) =>
    gqlRequest(client, DeleteRedirectsDocument.toString(), variables),
  UpdateRedirects: (variables: UpdateRedirectsMutationVariables) =>
    gqlRequest(client, UpdateRedirectsDocument.toString(), variables),
  GetRedirects: (variables: GetRedirectsQueryVariables) =>
    gqlRequest(client, GetRedirectsDocument.toString(), variables),
})
