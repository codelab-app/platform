import { graphql } from '@codelab/frontend/infra/gql'

export const CreatePagesMutation = graphql(`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        id
      }
    }
  }
`)
