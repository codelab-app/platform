import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const PageResolverPages = gql`
  query pageResolverPages {
    pages {
      elements {
        id
      }
      id
      name
      rootElement {
        id
      }
      slug
    }
  }
`
