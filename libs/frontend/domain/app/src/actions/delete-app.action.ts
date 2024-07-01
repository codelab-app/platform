'use server'

import type { AppDeleteInput, AppWhere } from '@codelab/frontend/infra/gql'
import { execute } from '@codelab/frontend/infra/gql'
import { DeleteAppsMutation } from './delete-app.mutation'

export const deleteAppAction = (where: AppWhere, $delete?: AppDeleteInput) =>
  execute(DeleteAppsMutation, { delete: $delete, where })
