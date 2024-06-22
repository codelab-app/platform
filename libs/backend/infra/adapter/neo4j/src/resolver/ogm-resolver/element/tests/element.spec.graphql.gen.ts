import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const ElementDependentTypes = gql`
  query elementDependentTypes {
    elements {
      dependantTypes {
        ... on EnumType {
          id
          name
        }
        ... on ArrayType {
          id
          name
        }
        ... on UnionType {
          id
          name
        }
      }
    }
  }
`
