import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const SelectAtomOptionsDocument = graphql(`
  query SelectAtomOptions {
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

export const selectAtomOptions = () => gqlFetch(SelectAtomOptionsDocument, {})
