import { graphql } from '@codelab/frontend/infra/gql'

export const CreateComponentMutation = graphql(`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        id
      }
    }
  }
`)
