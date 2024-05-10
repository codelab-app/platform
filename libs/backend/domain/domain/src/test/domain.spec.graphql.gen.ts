import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const TestCreateDomains = gql`
  mutation TestCreateDomains($input: [DomainCreateInput!]!) {
    createDomains(input: $input) {
      domains {
        id
      }
    }
  }
`
