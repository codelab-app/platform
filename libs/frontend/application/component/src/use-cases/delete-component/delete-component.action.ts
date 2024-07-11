'use server'

import type {
  ComponentDeleteInput,
  ComponentWhere,
} from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import { DeleteComponentsMutation } from './delete-component.mutation'

export const deleteComponentAction = (
  where: ComponentWhere,
  $delete?: ComponentDeleteInput,
) => execute(DeleteComponentsMutation, { delete: $delete, where })
