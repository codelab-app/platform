'use server'

import {
  type CreateDomainsMutationVariables,
  graphql,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

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
}: CreateDomainsMutationVariables) => gqlFetch(CreateDomainsMutation, { input })
