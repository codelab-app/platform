import { graphql } from '@codelab/frontend/infra/gql'

export const GetDomainsDocument = graphql(`
  query GetDomains($options: DomainOptions, $where: DomainWhere) {
    aggregate: domainsAggregate(where: $where) {
      count
    }
    items: domains(options: $options, where: $where) {
      ...Domain
    }
  }
`)
