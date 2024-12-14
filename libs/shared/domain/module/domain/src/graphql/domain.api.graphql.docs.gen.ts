import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'
import { DomainFragmentDoc } from '@codelab/shared/infra/gql'

export const DomainListDocument = graphql(`
  query DomainList($options: DomainOptions, $where: DomainWhere) {
    aggregate: domainsAggregate(where: $where) {
      count
    }
    items: domains(options: $options, where: $where) {
      ...Domain
    }
  }
`)

export const CreateDomainsDocument = graphql(`
  mutation CreateDomains($input: [DomainCreateInput!]!) {
    createDomains(input: $input) {
      domains {
        id
      }
    }
  }
`)

export const UpdateDomainsDocument = graphql(`
  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
    updateDomains(update: $update, where: $where) {
      domains {
        id
      }
    }
  }
`)

export const DeleteDomainsDocument = graphql(`
  mutation DeleteDomains($where: DomainWhere!) {
    deleteDomains(where: $where) {
      nodesDeleted
    }
  }
`)
