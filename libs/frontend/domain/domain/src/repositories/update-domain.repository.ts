'use server'

import {
  graphql,
  type UpdateDomainsMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const UpdateDomainMutation = graphql(`
  mutation UpdateDomains($where: DomainWhere!, $update: DomainUpdateInput!) {
    updateDomains(update: $update, where: $where) {
      domains {
        id
      }
    }
  }
`)

export const updateDomainRepository = async ({
  update,
  where,
}: UpdateDomainsMutationVariables) =>
  await gqlFetch(UpdateDomainMutation, { update, where })
