'use server'

import {
  execute,
  graphql,
  type UpdateDomainsMutationVariables,
} from '@codelab/frontend/infra/gql'

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
  await execute(UpdateDomainMutation, { update, where })
