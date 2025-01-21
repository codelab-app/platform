import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'

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
