import { graphql } from '@codelab/frontend/infra/gql'

export const CreateComponentsDocument = graphql(`
  mutation CreateComponents($input: [ComponentCreateInput!]!) {
    createComponents(input: $input) {
      components {
        id
      }
    }
  }
`)
