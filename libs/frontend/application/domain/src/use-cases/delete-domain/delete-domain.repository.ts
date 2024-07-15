'use server'

import {
  type DeleteDomainsMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const DeleteDomainsMutation = graphql(`
  mutation DeleteDomains($where: DomainWhere!) {
    deleteDomains(where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteDomainsRepository = async ({
  where,
}: DeleteDomainsMutationVariables) => gqlFetch(DeleteDomainsMutation, { where })
