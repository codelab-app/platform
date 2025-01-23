import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'
import {
  RedirectFragmentDoc,
  RedirectPreviewFragmentDoc,
} from '@codelab/shared/infra/gqlgen'

export const CreateRedirectsDocument = graphql(`
  mutation CreateRedirects($input: [RedirectCreateInput!]!) {
    createRedirects(input: $input) {
      redirects {
        __typename
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
        __typename
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

export const GetRedirectsPreviewDocument = graphql(`
  query GetRedirectsPreview($options: RedirectOptions, $where: RedirectWhere) {
    aggregate: redirectsAggregate(where: $where) {
      count
    }
    items: redirects(options: $options, where: $where) {
      ...RedirectPreview
    }
  }
`)
