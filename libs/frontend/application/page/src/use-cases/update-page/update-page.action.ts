'use server'

import {
  execute,
  graphql,
  type PageUpdateInput,
  type UpdatePagesMutationVariables,
} from '@codelab/frontend/infra/gql'
import type { PageWhere } from '@codelab/shared/abstract/codegen'

const UpdatePagesMutation = graphql(`
  mutation UpdatePages($where: PageWhere, $update: PageUpdateInput) {
    updatePages(update: $update, where: $where) {
      pages {
        id
      }
    }
  }
`)

export const updatePageAction = async ({
  update,
  where,
}: UpdatePagesMutationVariables) =>
  await execute(UpdatePagesMutation, { update, where })
