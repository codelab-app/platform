'use server'

import {
  execute,
  type GetDomainsQueryVariables,
  graphql,
} from '@codelab/frontend/infra/gql'

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

export const getDomainsRepository = async ({
  options,
  where,
}: GetDomainsQueryVariables) =>
  await execute(GetDomainsDocument, { options, where })
