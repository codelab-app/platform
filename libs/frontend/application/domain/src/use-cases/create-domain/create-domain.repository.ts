'use server'

import {
  type CreateDomainsMutationVariables,
  execute,
  graphql,
} from '@codelab/frontend/infra/gql'

const CreateDomainsMutation = graphql(`
  mutation CreateDomains($input: [DomainCreateInput!]!) {
    createDomains(input: $input) {
      domains {
        id
      }
    }
  }
`)

export const createDomainRepository = async ({
  input,
}: CreateDomainsMutationVariables) => execute(CreateDomainsMutation, { input })
