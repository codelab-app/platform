import * as Types from '@codelab/shared/infra/gql'

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

export const IsTypeDescendantOf = (
  variables: IsTypeDescendantOfQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(IsTypeDescendantOfDocument.toString(), variables, next)

export const GetTypeReferences = (
  variables: GetTypeReferencesQueryVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(GetTypeReferencesDocument.toString(), variables, next)
