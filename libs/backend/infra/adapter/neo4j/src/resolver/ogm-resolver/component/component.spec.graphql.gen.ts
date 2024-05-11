import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const ComponentResolverComponents = gql`
  query componentResolverComponents {
    components {
      id
      name
      rootElement {
        id
      }
      elements {
        id
      }
    }
  }
`
