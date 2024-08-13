import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const GetSelectAtomOptionsDocument = graphql(`
  query GetSelectAtomOptions {
    atoms {
      __typename
      id
      name
      requiredParents {
        id
        type
      }
      type
    }
  }
`)

import { type GetSelectAtomOptionsQueryVariables } from '@codelab/shared/infra/gql'

export const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetSelectAtomOptionsDocument.toString(), variables, next)
