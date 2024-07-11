'use server'

import type {
  ElementDeleteInput,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import { execute, graphql } from '@codelab/frontend/infra/gql'

export const DeleteElementsMutation = graphql(`
  mutation DeleteElements($where: ElementWhere!, $delete: ElementDeleteInput) {
    deleteElements(delete: $delete, where: $where) {
      nodesDeleted
    }
  }
`)

export const deleteElementRepository = (
  $where: ElementWhere,
  $delete?: ElementDeleteInput,
) => execute(DeleteElementsMutation, { delete: $delete, where: $where })
