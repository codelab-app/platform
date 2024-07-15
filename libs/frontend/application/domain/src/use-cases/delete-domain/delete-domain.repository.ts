'use server'

import {
  type DeleteDomainsMutationVariables,
  type DomainDeleteInput,
  execute,
  graphql,
} from '@codelab/frontend/infra/gql'

const DeleteDomainsMutation = graphql(`
  mutation DeleteDomains($where: DomainWhere!) {
    deleteDomains(where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteDomainsRepository = async ({
  where,
}: DeleteDomainsMutationVariables) => execute(DeleteDomainsMutation, { where })
