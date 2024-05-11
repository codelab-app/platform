import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const PageResolverPages = gql`
  query pageResolverPages {
    pages {
      id
      name
      slug
      rootElement {
        id
      }
      elements {
        id
      }
    }
  }
`
