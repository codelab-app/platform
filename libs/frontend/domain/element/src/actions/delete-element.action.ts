'use server'

import type {
  ElementDeleteInput,
  ElementWhere,
} from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import { DeleteElementsMutation } from './delete-element.mutation'

export const deleteElementAction = (
  $where: ElementWhere,
  $delete?: ElementDeleteInput,
) => execute(DeleteElementsMutation, { delete: $delete, where: $where })
