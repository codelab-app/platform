'use server'

import {
  graphql,
  type UpdatePagesMutationVariables,
} from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const UpdatePagesMutation = graphql(`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(update: $update, where: $where) {
      pages {
        id
      }
    }
  }
`)

export const updatePageRepository = async ({
  update,
  where,
}: UpdatePagesMutationVariables) =>
  await gqlFetch(UpdatePagesMutation, { update, where })
