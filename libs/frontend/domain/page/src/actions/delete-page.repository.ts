'use server'

import { execute, graphql } from '@codelab/frontend/infra/gql'
import type {
  PageDeleteInput,
  PageWhere,
} from '@codelab/shared/abstract/codegen'

export const deletePageRepository = (
  $where: PageWhere,
  $delete?: PageDeleteInput,
) => execute(DeletePagesMutation, { delete: $delete, where: $where })

export const DeletePagesMutation = graphql(`
  mutation DeletePages($where: PageWhere!, $delete: PageDeleteInput) {
    deletePages(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)
