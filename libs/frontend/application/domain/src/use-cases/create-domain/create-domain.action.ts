import { execute, graphql } from '@codelab/frontend/infra/gql'
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

export const createDomainAction = async (input: DomainCreateInput) => {
  return execute(CreateDomainsMutation, { input })
}
