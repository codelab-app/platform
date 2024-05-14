import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const ComponentResolverComponents = gql`
  query componentResolverComponents {
    components {
      elements {
        id
      }
      id
      name
      rootElement {
        id
      }
    }
  }
`
