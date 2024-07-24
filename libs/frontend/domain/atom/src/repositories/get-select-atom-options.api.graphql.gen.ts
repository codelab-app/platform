import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
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
import { type GetSelectAtomOptionsQueryVariables } from '@codelab/frontend/infra/gql'

const GetSelectAtomOptions = (
  variables: GetSelectAtomOptionsQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetSelectAtomOptionsDocument, variables, next)

export const getSdk = () => ({ GetSelectAtomOptions })
