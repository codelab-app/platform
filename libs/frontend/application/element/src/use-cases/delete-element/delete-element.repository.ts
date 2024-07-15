'use server'

import type {
  ElementDeleteInput,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

const DeleteElementsMutation = graphql(`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteElementRepository = (
  $where: ElementWhere,
  $delete?: ElementDeleteInput,
) => gqlFetch(DeleteElementsMutation, { delete: $delete, where: $where })
