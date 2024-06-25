import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from 'graphql-tag'

export const TestCreateDomainApps = gql`
  mutation TestCreateDomainApps($input: [AppCreateInput!]!) {
    createApps(input: $input) {
      apps {
        id
      }
    }
  }
`
export const TestCreateDomains = gql`
  mutation TestCreateDomains($input: [DomainCreateInput!]!) {
    createDomains(input: $input) {
      domains {
        id
      }
    }
  }
`
export const TestUpdateDomains = gql`
  mutation TestUpdateDomains(
    $where: DomainWhere!
    $update: DomainUpdateInput!
  ) {
    updateDomains(update: $update, where: $where) {
      domains {
        id
      }
    }
  }
`
export const TestDeleteDomains = gql`
  mutation TestDeleteDomains($where: DomainWhere!) {
    deleteDomains(where: $where) {
      nodesDeleted
    }
  }
`
