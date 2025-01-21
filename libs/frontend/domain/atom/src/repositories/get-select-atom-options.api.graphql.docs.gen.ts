import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'

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
