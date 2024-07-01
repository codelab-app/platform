'use server'

import { execute } from '@codelab/frontend/infra/gql'
import type {
  PageDeleteInput,
  PageWhere,
} from '@codelab/shared/abstract/codegen'
import { DeletePagesMutation } from './delete-page.mutation'

export const deletePageAction = (
  $where: PageWhere,
  $delete?: PageDeleteInput,
) => execute(DeletePagesMutation, { delete: $delete, where: $where })
