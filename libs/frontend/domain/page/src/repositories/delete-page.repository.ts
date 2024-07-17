'use server'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'
import type {
  PageDeleteInput,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import { Page } from '../store'

export const DeletePagesMutation = graphql(`
  mutation DeletePages($where: PageWhere!, $delete: PageDeleteInput) {
    deletePages(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deletePageRepository = (
  $where: PageWhere,
  $delete: PageDeleteInput = Page.toDeleteInput(),
) => gqlFetch(DeletePagesMutation, { delete: $delete, where: $where })
