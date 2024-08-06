import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import { RedirectFragmentDoc } from '@codelab/frontend/infra/gql'

export const CreateRedirectsDocument = graphql(`
  mutation CreateRedirects($input: [RedirectCreateInput!]!) {
    createRedirects(input: $input) {
      redirects {
        id
      }
    }
  }
`)

export const DeleteRedirectsDocument = graphql(`
  mutation DeleteRedirects(
    $where: RedirectWhere
    $delete: RedirectDeleteInput
  ) {
    deleteRedirects(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const UpdateRedirectsDocument = graphql(`
  mutation UpdateRedirects(
    $where: RedirectWhere
    $update: RedirectUpdateInput
  ) {
    updateRedirects(update: $update, where: $where) {
      redirects {
        id
      }
    }
  }
`)

export const GetRedirectsDocument = graphql(`
  query GetRedirects($options: RedirectOptions, $where: RedirectWhere) {
    aggregate: redirectsAggregate(where: $where) {
      count
    }
    items: redirects(options: $options, where: $where) {
      ...Redirect
    }
  }
`)

import {
  type CreateRedirectsMutationVariables,
  type DeleteRedirectsMutationVariables,
  type UpdateRedirectsMutationVariables,
  type GetRedirectsQueryVariables,
} from '@codelab/frontend/infra/gql'

export const CreateRedirects = (
  variables: CreateRedirectsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(CreateRedirectsDocument.toString(), variables, next)

export const DeleteRedirects = (
  variables: DeleteRedirectsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteRedirectsDocument.toString(), variables, next)

export const UpdateRedirects = (
  variables: UpdateRedirectsMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(UpdateRedirectsDocument.toString(), variables, next)

export const GetRedirects = (
  variables: GetRedirectsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetRedirectsDocument.toString(), variables, next)
