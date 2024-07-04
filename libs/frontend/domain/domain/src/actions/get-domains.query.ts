import { graphql } from '@codelab/frontend/infra/gql'

export const GetDomainsListQuery = graphql(`
  query GetDomains($options: DomainOptions, $where: DomainWhere) {
    aggregate: domainsAggregate(where: $where) {
      count
    }
    items: domains(options: $options, where: $where) {
      ...Domain
    }
  }
`)
