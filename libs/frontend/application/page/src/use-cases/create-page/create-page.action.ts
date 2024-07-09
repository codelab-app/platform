'use server'

import {
  execute,
  graphql,
  type PageCreateInput,
} from '@codelab/frontend/infra/gql'

const CreatePagesMutation = graphql(`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        id
      }
    }
  }
`)

export const createPageAction = async (input: PageCreateInput) =>
  await execute(CreatePagesMutation, { input })
