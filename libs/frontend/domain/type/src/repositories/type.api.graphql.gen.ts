import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const IsTypeDescendantOfDocument = graphql(`
  query IsTypeDescendantOf($descendantTypeId: ID!, $parentTypeId: ID!) {
    isTypeDescendantOf(
      descendantTypeId: $descendantTypeId
      parentTypeId: $parentTypeId
    )
  }
`)

export const GetTypeReferencesDocument = graphql(`
  query GetTypeReferences($typeId: ID!) {
    getTypeReferences(typeId: $typeId) {
      label
      name
    }
  }
`)
import {
  type IsTypeDescendantOfQueryVariables,
  type GetTypeReferencesQueryVariables,
} from '@codelab/frontend/infra/gql'

const IsTypeDescendantOf = (
  variables: IsTypeDescendantOfQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(IsTypeDescendantOfDocument, variables, next)

const GetTypeReferences = (
  variables: GetTypeReferencesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypeReferencesDocument, variables, next)

export const getSdk = () => ({ IsTypeDescendantOf, GetTypeReferences })
