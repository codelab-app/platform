'use server'

import { graphql, type PageCreateInput } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const CreatePagesMutation = graphql(`
  mutation CreatePages($input: [PageCreateInput!]!) {
    createPages(input: $input) {
      pages {
        id
      }
    }
  }
`)

export const createPageRepository = async (input: PageCreateInput) =>
  await gqlFetch(CreatePagesMutation, { input })
