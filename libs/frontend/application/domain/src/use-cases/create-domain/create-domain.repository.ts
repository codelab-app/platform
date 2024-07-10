'use server'

import {
  type CreateDomainsMutationVariables,
  execute,
  graphql,
} from '@codelab/frontend/infra/gql'
import type { DomainCreateInput } from '@codelab/shared/abstract/codegen'

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
